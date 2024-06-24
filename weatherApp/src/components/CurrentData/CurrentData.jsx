import { useContext, useEffect, useState } from "react";
import WeatherDataContext from "../contexts/WeatherDataContext";
import { WindySvg, SunnySvg, HazySvg, ThunderSvg, CloudySvg, RainySvg } from "../SvgComponents";

const CurrentData = () => {
  const { weatherData, aqiData } = useContext(WeatherDataContext);
  
  // Destructure the necessary data from weatherData
  const {
    main: { temp, humidity, feels_like } = {},
    weather: [{ description } = {}] = [],
    wind: { speed } = {},
    name,
    dt,
    timezone,
    sys: { country } = {},
  } = weatherData;

  // State for AQI
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    if (aqiData.list && aqiData.list.length > 0) {
      setAqi(aqiData.list[0].main.aqi);
    }
  }, [aqiData]);

  // Convert Unix timestamp to local date and time
  const getLocalTime = (unixTime, timezoneOffset) => {
    const localTime = new Date((unixTime + timezoneOffset) * 1000);
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const localTime = dt ? getLocalTime(dt, timezone) : 'Loading...';

  const getWeatherIcon = (description) => {
    if (speed > 40.2) return <WindySvg />

    switch (description?.toLowerCase()) {
      case 'clear sky':
        return <SunnySvg />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <CloudySvg />;
      case 'shower rain':
      case 'rain':
        return <RainySvg />;
      case 'thunderstorm':
        return <ThunderSvg />;
      case 'hazy':
      case 'haze':
        return <HazySvg />;
      default:
        return <CloudySvg />;
    }
  };

  return (
    <div className='w-full h-full flex flex-col p-[25%] gap-4'>
      <div className='flex flex-row gap-6'>
        <div className='text-8xl text-white font-bold flex items-center'>
          {temp ? `${Math.floor(temp)}°C` : 'Loading...'}
        </div>
        <div className='flex justify-center items-center'>
          {getWeatherIcon(description)}
        </div>
      </div>
      <div className='text-white text-3xl font-semibold'>
        <p>{name || 'Loading...'}, {country || 'Loading...'}</p>
      </div>
      <div className='text-white text-lg'>
        <p>Feels like: {feels_like ? `${Math.floor(feels_like)}°C` : '...'} | Humidity: {humidity || '...'}% | Wind: {speed ? `${speed} m/s` : '...'}</p>
      </div>
      <div className='text-white text-xl'>
        <p>{description} | AQI: {aqi !== null ? aqi : '...'}</p>
      </div>
    </div>
  );
};

export default CurrentData;
