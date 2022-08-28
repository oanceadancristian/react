import { useEffect, useState } from 'react';

export function Weather({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log('effect');
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},RO&appid=1751504f4bc33ef5bfc5f177df80bab1`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, [city]);

  if (!weather) {
    return <strong>Loading ...</strong>;
  }

  const weatherType = weather.weather[0].main;
  const weatherIcon = weather.weather[0].icon;
  const minTemp = (weather.main.temp_min - 273.15).toFixed(1);
  const currentTemp = (weather.main.temp - 273.15).toFixed(1);
  const maxTemp = (weather.main.temp_max - 273.15).toFixed(1);

  return (
    <>
      <h1>Weather is: {weatherType}</h1>
      <img
        src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt="Weather Icon"
      />
      <p>Min: {minTemp} &deg;C</p>
      <p>Current: {currentTemp} &deg;C</p>
      <p>Max: {maxTemp} &deg;C</p>
    </>
  );
}
