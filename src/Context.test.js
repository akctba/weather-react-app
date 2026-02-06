import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from './Context';

// Mock fetch globally
global.fetch = jest.fn();

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  configurable: true,
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Context Provider', () => {
  describe('componentDidMount - Geolocation', () => {
    test('fetches weather data successfully with geolocation', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      const mockWeatherData = {
        cod: 200,
        name: 'London',
        main: { temp: 15 },
        weather: [{ main: 'Clear' }],
      };

      mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
        success(mockPosition)
      );

      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockWeatherData,
      });

      const { container } = render(
        <Provider>
          <div>Test Child</div>
        </Provider>
      );

      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
      
      // Wait for the component to update
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    test('handles HTTP error in geolocation fetch', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
        success(mockPosition)
      );

      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ cod: '404', message: 'not found' }),
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Provider>
          <div>Test Child</div>
        </Provider>
      );

      // Wait for the component to update
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching weather by location:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    test('handles API error response in geolocation fetch', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
        success(mockPosition)
      );

      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ cod: '404', message: 'city not found' }),
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Provider>
          <div>Test Child</div>
        </Provider>
      );

      // Wait for the component to update
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching weather by location:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    test('handles PERMISSION_DENIED geolocation error', async () => {
      const mockError = {
        code: 1, // PERMISSION_DENIED
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      mockGeolocation.getCurrentPosition.mockImplementationOnce((success, error) =>
        error(mockError)
      );

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Provider>
          <div>Test Child</div>
        </Provider>
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith('Geolocation error:', mockError);

      consoleErrorSpy.mockRestore();
    });

    test('handles POSITION_UNAVAILABLE geolocation error', async () => {
      const mockError = {
        code: 2, // POSITION_UNAVAILABLE
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      mockGeolocation.getCurrentPosition.mockImplementationOnce((success, error) =>
        error(mockError)
      );

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Provider>
          <div>Test Child</div>
        </Provider>
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith('Geolocation error:', mockError);

      consoleErrorSpy.mockRestore();
    });

    test('handles TIMEOUT geolocation error', async () => {
      const mockError = {
        code: 3, // TIMEOUT
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      mockGeolocation.getCurrentPosition.mockImplementationOnce((success, error) =>
        error(mockError)
      );

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Provider>
          <div>Test Child</div>
        </Provider>
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith('Geolocation error:', mockError);

      consoleErrorSpy.mockRestore();
    });

    test('handles unsupported geolocation', () => {
      // Temporarily remove geolocation support
      Object.defineProperty(global.navigator, 'geolocation', {
        value: undefined,
        configurable: true,
      });

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      render(
        <Provider>
          <div>Test Child</div>
        </Provider>
      );

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Geolocation is not supported by this browser.'
      );

      consoleLogSpy.mockRestore();

      // Restore geolocation
      Object.defineProperty(global.navigator, 'geolocation', {
        value: mockGeolocation,
        configurable: true,
      });
    });
  });
});
