import React from "react";

const Context = React.createContext();

const api = {
    key: process.env.REACT_APP_OPENWEATHER_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
}

const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_LANGUAGE":
        return {
          ...state,
          language: action.payload
        };
        case "FIND_BY_NAME":
        return {
          ...state,
          weather: loadWeather(action.payload)
        };
      default:
        return state;
    }
  };

const loadWeather = (place) => {
    return fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(result => {
            if (result.cod && result.cod !== 200) {
                throw new Error(result.message || 'Weather data not available');
            }
            console.log(result);
            return result;
        })
        .catch(error => {
            console.error('Error loading weather:', error);
            throw error;
        });
}

export class Provider extends React.Component {
    state = {
        language: "en",
        location: "Vancouver, CA",
        weather : {},
        error: null,
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    }

    componentDidMount() {
        //get location and call API by Lat and Lon
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success callback
                position => {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;

                    fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(`HTTP error! status: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then(result => {
                            if (result.cod && result.cod !== 200) {
                                throw new Error(result.message);
                            }
                            console.log(result);
                            this.setState({weather: result});
                        })
                        .catch(error => {
                            console.error('Error fetching weather by location:', error);
                            this.setState({
                                error: 'Failed to load weather for your location'
                            });
                        });
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
                    this.setState({error: errorMessage});
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            this.setState({error: "Geolocation not supported"});
        }
    }

    render() {
        return (
            //Return the Provider with the data that we wanna share between components. Everything that we have inside Value, will be visible for all components.
            <Context.Provider value={this.state}>
              {this.props.children}
            </Context.Provider>
          );
    }
}

export const Consumer = Context.Consumer; // Export the Consumer. We need to import the Consumer where we want to use the data.