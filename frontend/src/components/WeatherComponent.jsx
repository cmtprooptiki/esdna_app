import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weatherbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind,faDroplet,faTemperatureLow,faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';


const WeatherComponent = (props) => {
  const latitude = props.lat;
  const longitude = props.lon;
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '3673af9d459c8c8f04991f992ffb9dc9'

  const toDateFunction = () => { 
    const months = [ 
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December', 
    ]; 
    const WeekDays = [ 
        'Sunday', 
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday', 
    ]; 
    const currentDate = new Date(); 
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()] 
        }`; 
    return date; 
}; 

  useEffect(() => {
    const fetchData = async () => {
        try {
            // const latitude = 37.7749; // Replace with your actual latitude
            // const longitude = -122.4194; // Replace with your actual longitude
            // // const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
            // console.log(latitude,longitude)
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather?lat=38.068968&lon=23.65545900&units=metric&APPID=3673af9d459c8c8f04991f992ffb9dc9",
                {
                    withCredentials: false,
                  }
            //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            );
      
            const data = response.data;
            setWeatherData(data)
            console.log('Weather Data:', data);
            // Handle the data as needed
          } catch (error) {
            console.error('Error fetching weather data:', error.message);
          }
        };
      
        fetchData();
  }, [latitude, longitude]);

  return (



    <div className="App"> 
    
    
    {weatherData && weatherData.main && ( 
        <div> 
            <div className="city-name"> 
                <h2> 
                    {weatherData.name}, <span>{weatherData.sys.country}</span> 
                </h2> 
            </div> 
            <div className="date"> 
                <span>{toDateFunction()}</span> 
            </div> 
            <div className="icon-temp"> 
                <img 
                    className=""
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                    alt={weatherData.weather[0].description} 
                /> 
                {Math.round(weatherData.main.temp)} 
                <sup className="deg">°C</sup> 
            </div> 

          <div className="des-wind">
          <p>{weatherData.weather[0].description.toUpperCase()}</p> 
          <p><FontAwesomeIcon icon={faTemperatureLow} />  {Math.round(weatherData.main.temp_min )}°C</p>
          <p><FontAwesomeIcon icon={faTemperatureHigh} />  {Math.round(weatherData.main.temp_max )}°C</p>
           <p>Feels like: {Math.round(weatherData.main.feels_like )}°C</p>

            </div>
            <div className="des-wind"> 
             
               
                <p> <FontAwesomeIcon icon={faWind} /> {weatherData.wind.speed}m/s</p> 
            </div> 

            <div className="des-wind"> 
                <p> <FontAwesomeIcon icon={faDroplet} /> {weatherData.main.humidity}%</p> 
            </div> 
            <div className="des-wind"> 
                <p>Pressure: {weatherData.main.pressure}</p> 
            </div> 

        </div> 
    )} 
</div> 




//     <div>
//     <h2>Μετορολογικές Ενδείξεις</h2>
//     {weatherData ? (
//       <div className="weather-box">
//         <h3>{weatherData.name}, {weatherData.sys.country}</h3>
//         <p>{weatherData.weather[0].description}</p>
//         <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
//         <p>Feels like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>

//         <p>Humidity: {weatherData.main.humidity}%</p>
//         <p>Wind: {weatherData.wind.speed} m/s, {weatherData.wind.deg}°</p>
//         {/* Additional information can be added based on the available data */}
//       </div>
//     ) : (
//       <p>Loading weather data...</p>
//     )}
//   </div>
  );
};

export default WeatherComponent;


