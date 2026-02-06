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
    fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        return result;
    });
}

export class Provider extends React.Component {
    state = {
        language: "en",
        location: "Vancouver, CA",
        weather : {},
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    }

    componentDidMount() {
        //get location and call API by Lat and Lon
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        //return result;
                        this.setState({weather: result});
                    });

            });
          } else {
            console.log("Geolocation is not supported by this browser.");
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