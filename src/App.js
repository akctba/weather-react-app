import React, { useState } from 'react';
import LanguageCombo from './LanguageCombo';
import { Provider } from "./Context"; // Import Provider from Context.js

import './index.css';
const api = {
    key: "720b1a41660c87e3beb3873ed2143b01",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
                setQuery('');
                console.log(result);
            });
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