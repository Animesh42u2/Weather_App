import React, { useState } from 'react';
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState(''); // Initial state as an empty string
  const [weather, setWeather] = useState(null); // Initial state as null
  const [error, setError] = useState(null); // State for error handling

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f27aed68ca1eea844ebafff6b252402&units=metric`
      );
      setWeather(response.data); // Set the weather data
      setError(null); // Clear any errors
    } catch (error) {
      console.error("Error fetching weather data", error);
      setWeather(null); // Clear previous data on error
      setError('Could not fetch weather. Please try again.');
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleClick}>Get Weather</button>

      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
