import { useEffect, useState } from "react";
import CurrentData from "./components/CurrentData/CurrentData.jsx";
import ForcastData from "./components/ForcastData/ForcastData.jsx";
import Header from "./components/Header/Header.jsx";
import { ForecastProvider } from "./components/contexts/forecastContext/ForecastContext.jsx";
import { SearchProvider } from "./components/contexts/searchContexts/SearchContext.jsx";
import { ThemeContextProvider } from "./components/contexts/themeContext/ThemeContext.js";
import WeatherDataContextProvider from './components/contexts/weatherDataContexts/WeatherDataContextProvider.jsx';

function App() {
  const [theme, setTheme] = useState('light');

  const lightMode = () => {
    setTheme('light');
  };

  const darkMode = () => {
    setTheme('dark');
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(theme);
  }, [theme]);

  return (
    <ThemeContextProvider value={{ theme, lightMode, darkMode }}>
      <WeatherDataContextProvider>
        <SearchProvider>
          <ForecastProvider>
            <div className={`w-full h-full flex flex-col bg-cover bg-center ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}`}>
              <div className="w-full h-[14%]">
                <Header />
              </div>
              <div className="w-full h-[86%] flex flex-row font-playwrite">
                <div className="w-1/2 h-full flex justify-center items-center">
                  <CurrentData />
                </div>
                <div className="w-1/2 h-[95%] flex flex-col justify-center items-start">
                  <ForcastData />
                  <div className="w-full h-[5%] flex justify-end items-end">
                      <p className="w-4/5 text-white font-oleo">Developed by avhixorin</p>
                  </div>
                </div>
                
              </div>
            </div>
          </ForecastProvider>
        </SearchProvider>
      </WeatherDataContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
