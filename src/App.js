import React, { useContext } from 'react';
import LanguageCombo from './LanguageCombo';
import { WeatherContext } from "./Context";

import './index.css';

function App() {
    const {
        query,
        setQuery,
        weather,
        loading,
        error,
        searchByName
    } = useContext(WeatherContext);

    const search = evt => {
        if (evt.key === "Enter") {
            searchByName();
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    }

    

    return (
        <div className="app">
            <main>
                <div className="search-row">
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
                </div>
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
    );
}

export default App;