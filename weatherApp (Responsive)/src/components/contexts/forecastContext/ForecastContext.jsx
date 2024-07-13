import { createContext, useState, useEffect, useMemo, useContext } from "react";
import WeatherDataContext from "../weatherDataContexts/WeatherDataContext";

const ForecastContext = createContext();

const ForecastProvider = ({ children }) => {
    const { searchValue, currentCity } = useContext(WeatherDataContext);

    const [forecastData, setForecastData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = '38acd91579d649f2b3401de1a0403e55';

    useEffect(() => {
        const fetchForecast = async () => {
            setIsLoading(true);
            setError(null);

            try {
                
                const cityToFetch = searchValue || currentCity || 'London'; // Fallback to 'London' if both searchValue and currentCity are falsy
                const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityToFetch}&key=${apiKey}&days=5`;
                const response = await fetch(forecastUrl);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                
                // Ensure data is complete before setting state
                if (data && data.data && data.data.length > 0) {
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
    }, [searchValue, currentCity]);

    
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
