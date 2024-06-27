// SearchContext.js
import { createContext, useState, useCallback, useEffect, useMemo, useContext } from 'react';
import debounce from 'lodash/debounce';
import WeatherDataContext from '../weatherDataContexts/WeatherDataContext';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const userName = 'avhi5497';
  const [inputData, setInputData] = useState('');
  const [cityData, setCityData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCityData = useCallback(async (city) => {
    const aqiApiUrl = `http://api.geonames.org/searchJSON?name_startsWith=${city}&maxRows=6&username=${userName}`;
    try {
      const response = await fetch(aqiApiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.geonames.length > 0) setCityData(data.geonames);
    } catch (error) {
      console.error('Error fetching AQI data:', error);
    }
  }, [userName]);

  const debouncedFetchCityData = useMemo(() => debounce(fetchCityData, 300), [fetchCityData]);

  useEffect(() => {
    if (inputData) {
      debouncedFetchCityData(inputData);
      setShowSuggestions(true);
    } else {
      setCityData([]);
      setShowSuggestions(false);
    }
  }, [inputData, debouncedFetchCityData]);
  const {setSearchValue} = useContext(WeatherDataContext)
  const handleSuggestionClick = (city) => {
    setInputData(city);
    setShowSuggestions(false);
    setSearchValue(city);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCityData(inputData);
    setShowSuggestions(false);
    
  };

  return (
    <SearchContext.Provider value={{
      inputData,
      setInputData,
      cityData,
      showSuggestions,
      handleSuggestionClick,
      handleSearchSubmit
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
