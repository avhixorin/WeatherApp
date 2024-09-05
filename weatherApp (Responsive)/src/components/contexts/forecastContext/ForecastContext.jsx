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
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityToFetch}&appid=${apiKey}&units=metric&cnt=5`;
                const response = await fetch(forecastUrl);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.list.length > 0) {
                    setForecastData(data);
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
