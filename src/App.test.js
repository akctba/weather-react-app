import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from './Context';

// Mock fetch globally
global.fetch = jest.fn();

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
  Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation,
    configurable: true,
  });

  mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
    success({
      coords: {
        latitude: 51.5074,
        longitude: -0.1278,
      },
    })
  );

  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({
      cod: 200,
      name: 'London',
      sys: { country: 'GB' },
      main: { temp: 15 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }]
    })
  });
});

const renderApp = () => render(
  <Provider>
    <App />
  </Provider>
);

test('renders search input', () => {
  renderApp();
  const searchInput = screen.getByPlaceholderText(/search/i);
  expect(searchInput).toBeInTheDocument();
});

test('displays error message when API returns error response', async () => {
  // Mock fetch to return an error response
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: async () => ({ cod: '404', message: 'city not found' })
  });

  renderApp();
  const searchInput = screen.getByPlaceholderText(/search/i);
  
  // Type a city name and press Enter
  fireEvent.change(searchInput, { target: { value: 'InvalidCity123' } });
  fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Wait for error message to appear
  await waitFor(() => {
    const errorMessage = screen.getByText(/HTTP error! status: 404/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

test('displays error message when API returns city not found', async () => {
  // Mock fetch to return a successful HTTP response but with API error
  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({ cod: '404', message: 'city not found' })
  });

  renderApp();
  const searchInput = screen.getByPlaceholderText(/search/i);
  
  // Type a city name and press Enter
  fireEvent.change(searchInput, { target: { value: 'NonExistentCity' } });
  fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Wait for error message to appear
  await waitFor(() => {
    const errorMessage = screen.getByText(/city not found/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

test('displays error message on network failure', async () => {
  // Mock fetch to reject with network error
  global.fetch.mockRejectedValueOnce(new Error('Network error'));

  renderApp();
  const searchInput = screen.getByPlaceholderText(/search/i);
  
  // Type a city name and press Enter
  fireEvent.change(searchInput, { target: { value: 'London' } });
  fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Wait for error message to appear
  await waitFor(() => {
    const errorMessage = screen.getByText(/Network error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

test('clears error on successful search after error', async () => {
  // First, mock a failed request
  global.fetch.mockRejectedValueOnce(new Error('Network error'));

  renderApp();
  const searchInput = screen.getByPlaceholderText(/search/i);
  
  // Trigger error
  fireEvent.change(searchInput, { target: { value: 'FailCity' } });
  fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Wait for error to appear
  await waitFor(() => {
    expect(screen.getByText(/Network error/i)).toBeInTheDocument();
  });

  // Now mock a successful request
  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({
      cod: 200,
      name: 'London',
      sys: { country: 'GB' },
      main: { temp: 15 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }]
    })
  });

  // Trigger successful search
  fireEvent.change(searchInput, { target: { value: 'London' } });
  fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Wait for error to disappear
  await waitFor(() => {
    expect(screen.queryByText(/Network error/i)).not.toBeInTheDocument();
  });
});
