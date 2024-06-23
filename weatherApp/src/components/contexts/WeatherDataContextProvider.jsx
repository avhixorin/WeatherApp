import { useEffect, useState, useMemo } from 'react';
import WeatherDataContext from './WeatherDataContext';

const WeatherDataContextProvider = ({ children }) => {
  const [currentData, setCurrentData] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [searchCityLat, setSearchCityLat] = useState(19.4356603);
  const [searchCityLon, setSearchCityLon] = useState(72.8160861);
  const weatherApiKey = '9bc95084cf36e36a4f031a0a9debbb41';

  const defaultLat = 19.4356603;
  const defaultLon = 72.8160861;

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setCurrentData({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      } catch (error) {
        console.error('Error getting position:', error);
        setCurrentData({ latitude: defaultLat, longitude: defaultLon });
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
      setCurrentData({ latitude: defaultLat, longitude: defaultLon });
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;
    try {
      const response = await fetch(weatherApiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentData.latitude && currentData.longitude) {
      fetchWeatherData(currentData.latitude, currentData.longitude);
    }
  }, [currentData]);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchValue)}&limit=5&appid=${weatherApiKey}`)
        .then(res => res.json())
        .then((data) => {
          if (data.length > 0) {
            setSearchCityLat(data[0].lat);
            setSearchCityLon(data[0].lon);
          } else {
            console.log('City not found');
            // Handle case when no cities match the search
          }
        })
        .catch(error => {
          console.error('Error fetching city data:', error);
          // Handle error fetching city data
        });
    }
  }, [searchValue]);

  useEffect(() => {
    // Fetch weather data only when both searchCityLat and searchCityLon are updated
    if (searchCityLat !== null && searchCityLon !== null) {
      fetchWeatherData(searchCityLat, searchCityLon);
    }
  }, [searchCityLat, searchCityLon]);

  const contextValue = useMemo(() => ({
    currentData,
    weatherData,
    setCurrentData,
    searchValue,
    setSearchValue,
    searchCityLat,
    searchCityLon
  }), [currentData, weatherData, searchValue, searchCityLat, searchCityLon]);

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContextProvider;
