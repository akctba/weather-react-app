import React, { useState } from 'react';
import LanguageCombo from './LanguageCombo';
import { Provider } from "./Context"; // Import Provider from Context.js
import { api } from './config/api'; 

import './index.css';

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = evt => {
        if (evt.key === "Enter") {
            setLoading(true);
            setError(null); // Clear previous errors
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(result => {
                // Check for API-level errors
                if (result.cod && result.cod !== 200) {
                    throw new Error(result.message || 'City not found');
                }
                
                setWeather(result);
                setQuery('');
                if (process.env.NODE_ENV === "development") {
                    console.log(result);
                }
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                setError(error.message || 'Failed to fetch weather data');
                setWeather({}); // Clear previous weather data
            })
            .finally(() => setLoading(false));
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", 
        "August", "Septerber", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Fraday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    }

    

    return (
        <Provider>
        <div className="app">
            <main>
                <div className="search-box" >
                    <input type="text"
                    className="search-bar"
                    placeholder="Search..."
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                    />
                </div>
                <LanguageCombo default="en" />
                {loading && (
                    <div className="loading" role="status" aria-live="polite">
                        <span className="loading__spinner" aria-hidden="true" />
                        <span className="loading__text">Loading...</span>
                    </div>
                )}
                {error && (
                    <div className="error-box" role="alert">
                        <p className="error-message">{error}</p>
                    </div>
                )}
                {(typeof weather.main !== "undefined") ? (
                    <div className="location-box">
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dateBuilder(new Date())}</div>
                        <div className="temp">{Math.round(weather.main.temp)}&#8451;</div>
                        <div className="weather">
                            <img alt={weather.weather[0].description}
                                src={"https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"} />
                            {weather.weather[0].main}
                        </div>
                    </div>
                ) : ('')}

                
            </main>
            
        </div>
        </Provider>
    );
}

export default App;