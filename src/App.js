import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [value, setValue] = useState({});
  const [location, setLocation] = useState('');
  const key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${key}`;

  const search = (e) => {
    if (e.key === 'Enter') {
      axios
        .get(url)
        .then((res) => {
          setValue(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert(err.response.statusText);
          }
          console.log(err);
        });

      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyUp={search}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="up">
          <div className="location">
            <p>{value.name}</p>
          </div>
          <div className="temperature">
            {value.main ? <h1>{value.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {value.weather ? <p>{value.weather[0].main}</p> : null}
          </div>
        </div>
        {value.name !== undefined && (
          <div className="down">
            <div className="feel">
              {value.main ? (
                <p className="bold">{value.main.feels_like}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {value.main ? (
                <p className="bold">{value.main.humidity}</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {value.wind ? (
                <p className="bold">{value.wind.speed}m/s</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
