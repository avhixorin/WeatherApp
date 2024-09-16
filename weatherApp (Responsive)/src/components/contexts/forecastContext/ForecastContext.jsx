import { createContext, useState, useEffect, useMemo, useContext } from "react";
import WeatherDataContext from "../weatherDataContexts/WeatherDataContext";

const ForecastContext = createContext();

const ForecastProvider = ({ children }) => {
    const { searchValue, currentCity } = useContext(WeatherDataContext);
    const apiKey = import.meta.env.VITE_DAYSFORCASTKEY;

    const [forecastData, setForecastData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const cityToFetch = searchValue || currentCity || 'Mumbai';
                
                // Fetch more than 5 data points to cover full 5-day forecast
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityToFetch}&appid=${apiKey}&units=metric&cnt=40`;
                const response = await fetch(forecastUrl);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('City not found');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }

                const data = await response.json();

                if (data.list && data.list.length > 0) {
                    // Filter forecast data to only include one forecast per day (e.g., 12:00 PM)
                    const filteredData = data.list.filter(forecast => 
                        new Date(forecast.dt_txt).getHours() === 12
                    );
                    setForecastData({ ...data, list: filteredData });
                } else {
                    throw new Error('Incomplete data received from API');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForecast();
    }, [searchValue, currentCity, apiKey]);

    const contextValue = useMemo(() => ({
        forecastData,
        isLoading,
        error
    }), [forecastData, isLoading, error]);

    return (
        <ForecastContext.Provider value={contextValue}>
            {children}
        </ForecastContext.Provider>
    );
};

export { ForecastContext, ForecastProvider };
