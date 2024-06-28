import { useEffect, useState, useMemo, useContext } from 'react';
import WeatherDataContext from './WeatherDataContext';


const WeatherDataContextProvider = ({ children }) => {
  const [searchCityWeatherData, setSearchCityWeatherData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [currentLat, setCurrentLat] = useState('');
  const [currentLon, setCurrentLon] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [currentCityWeather, setCurrentCityWeather] = useState({});
  
  const weatherApiKey = '9bc95084cf36e36a4f031a0a9debbb41';

  const defaultLat = 19.4356603;
  const defaultLon = 72.8160861;

  useEffect(() => {
    getCurrentCoords();
  }, []);

  useEffect(() => {
    if (currentLat && currentLon) {
      getCurrentCity(currentLat, currentLon);
    } else {
      setCurrentLat(defaultLat);
      setCurrentLon(defaultLon);
    }
  }, [currentLat, currentLon]);

  useEffect(() => {
    if (currentCity) {
      getCurrentLocationWeatherData(currentCity);
    }
  }, [currentCity]);

  useEffect(() => {
    if (searchValue) {
      getSearchCityWeatherData(searchValue);
    }
  }, [searchValue]);

  const getCurrentCoords = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setCurrentLat(position.coords.latitude);
        setCurrentLon(position.coords.longitude);
      } catch (error) {
        console.error('Error getting position:', error);
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const getCurrentCity = async (lat, lon) => {
    const getCurrentCityApiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;
    try {
      const response = await fetch(getCurrentCityApiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCurrentCity(data.address.city || data.address.town || data.address.village || 'City not found');
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const getCurrentLocationWeatherData = async (currentCity) => {
    const getCurrentLocationWeatherData = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${weatherApiKey}&units=metric`;
    try {
      const response = await fetch(getCurrentLocationWeatherData);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCurrentCityWeather({
        currentTemperature: data.main.temp,
        aqi: data.main.pressure,
        weatherDescription: data.weather[0].description,
        feelsLike: data.main.feels_like,
        cityName: data.name,
        countryName: data.sys.country,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getSearchCityWeatherData = async (searchValue) => {
    const getSearchCityWeatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${weatherApiKey}&units=metric`;
    try {
      const response = await fetch(getSearchCityWeatherDataUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchCityWeatherData({
        currentTemperature: data.main.temp,
        aqi: data.main.pressure,
        weatherDescription: data.weather[0].description,
        feelsLike: data.main.feels_like,
        cityName: data.name,
        countryName: data.sys.country,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const contextValue = useMemo(() => ({
    searchCityWeatherData,
    searchValue,
    setSearchValue,
    currentLat,
    currentLon,
    currentCity,
    currentCityWeather
  }), [searchCityWeatherData, searchValue, currentLat, currentLon, currentCity, currentCityWeather]);
  
  return (
    <WeatherDataContext.Provider value={contextValue}>
      {children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContextProvider;
