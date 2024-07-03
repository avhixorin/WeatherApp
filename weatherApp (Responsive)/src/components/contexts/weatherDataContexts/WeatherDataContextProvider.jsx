import { useEffect, useState, useMemo } from 'react';
import WeatherDataContext from './WeatherDataContext';
import Loading from '../../Loading/Loading';

const WeatherDataContextProvider = ({ children }) => {
  const [searchCityWeatherData, setSearchCityWeatherData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [currentLat, setCurrentLat] = useState('');
  const [currentLon, setCurrentLon] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [currentCityWeather, setCurrentCityWeather] = useState({});
  const [locationGranted, setLocationGranted] = useState(false);

  
  const weatherApiKey = '9bc95084cf36e36a4f031a0a9debbb41'

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
        setLocationGranted(true);
      } catch (error) {
        console.error('Error getting position:', error);
        setCurrentLat(defaultLat);
        setCurrentLon(defaultLon);
        setLocationGranted(false);
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
      setCurrentLat(defaultLat);
      setCurrentLon(defaultLon);
      setLocationGranted(false);
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

  const fetchWeatherData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  const getCurrentLocationWeatherData = async (currentCity) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${weatherApiKey}&units=metric`;
    const data = await fetchWeatherData(url);
    if (data) {
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
    }
  };

  const getSearchCityWeatherData = async (searchValue) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${weatherApiKey}&units=metric`;
    const data = await fetchWeatherData(url);
    if (data) {
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
    }
  };

  const contextValue = useMemo(() => ({
    searchCityWeatherData,
    searchValue,
    setSearchValue,
    currentLat,
    currentLon,
    currentCity,
    currentCityWeather,
    locationGranted,
  }), [searchCityWeatherData, searchValue, currentLat, currentLon, currentCity, currentCityWeather, locationGranted]);

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {locationGranted ? children : <Loading />}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContextProvider;
