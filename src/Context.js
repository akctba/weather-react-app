import React from "react";
import { api } from "./config/api";
import { log } from "./log";

export const WeatherContext = React.createContext();

const buildWeatherUrl = (params) => `${api.base}weather?${params}&units=metric&APPID=${api.key}`;

export class Provider extends React.Component {
    state = {
        language: "en",
        location: "Vancouver, CA",
        query: "",
        weather: {},
        loading: false,
        error: null,
    }

    setQuery = (query) => {
        this.setState({ query });
    }

    setLanguage = (language) => {
        this.setState({ language });
    }

    fetchWeather = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        if (result.cod && result.cod !== 200) {
            throw new Error(result.message || 'Weather data not available');
        }
        log(result);
        return result;
    }

    fetchWeatherByQuery = (query) => {
        return this.fetchWeather(buildWeatherUrl(`q=${query}`));
    }

    fetchWeatherByCoords = (lat, lon) => {
        return this.fetchWeather(buildWeatherUrl(`lat=${lat}&lon=${lon}`));
    }

    searchByName = async () => {
        const { query } = this.state;

        this.setState({ loading: true, error: null });
        try {
            const result = await this.fetchWeatherByQuery(query);
            this.setState({ weather: result, query: "" });
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.setState({
                error: error.message || 'Failed to fetch weather data',
                weather: {}
            });
        } finally {
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        //get location and call API by Lat and Lon
        if (navigator.geolocation) {
            this.setState({ loading: true, error: null });
            navigator.geolocation.getCurrentPosition(
                // Success callback
                async position => {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;

                    try {
                        const result = await this.fetchWeatherByCoords(lat, lon);
                        this.setState({ weather: result });
                    } catch (error) {
                        console.error('Error fetching weather by location:', error);
                        this.setState({
                            error: 'Failed to load weather for your location'
                        });
                    } finally {
                        this.setState({ loading: false });
                    }
                },
                // Error callback
                error => {
                    console.error('Geolocation error:', error);
                    let errorMessage;
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Location permission denied";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information unavailable";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Location request timed out";
                            break;
                        default:
                            errorMessage = "An unknown error occurred";
                    }
                    this.setState({ error: errorMessage, loading: false });
                }
            );
        } else {
            if (process.env.NODE_ENV === "development") {
                console.log("Geolocation is not supported by this browser.");
            }
            this.setState({ error: "Geolocation not supported", loading: false });
        }
    }

    render() {
        const value = {
            ...this.state,
            setQuery: this.setQuery,
            setLanguage: this.setLanguage,
            searchByName: this.searchByName
        };

        return (
            //Return the Provider with the data that we wanna share between components. Everything that we have inside Value, will be visible for all components.
            <WeatherContext.Provider value={value}>
              {this.props.children}
            </WeatherContext.Provider>
          );
    }
}

export const Consumer = WeatherContext.Consumer; // Export the Consumer. We need to import the Consumer where we want to use the data.