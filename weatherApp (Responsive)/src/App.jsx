import { useEffect, useState } from "react";
import CurrentData from "./components/CurrentData/CurrentData.jsx";
import ForcastData from "./components/ForcastData/ForcastData.jsx";
import Header from "./components/Header/Header.jsx";
import { ForecastProvider } from "./components/contexts/forecastContext/ForecastContext.jsx";
import { SearchProvider } from "./components/contexts/searchContexts/SearchContext.jsx";
import { ThemeContextProvider } from "./components/contexts/themeContext/ThemeContext.js";
import WeatherDataContextProvider from './components/contexts/weatherDataContexts/WeatherDataContextProvider.jsx';
import SearchBar from "./components/Header/SearchBar/SearchBar.jsx";
import ToggleSwitch from "./components/Header/ToggleSwitch/ToggleSwitch.jsx";

function App() {
  const [theme, setTheme] = useState('light');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

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

  const handleBarClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleBarSearchClick = () => {
    setIsDropdownVisible(false);
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleModeClick = () => {
    setIsDropdownVisible(false);
    if(theme === 'dark'){
      lightMode()
    } else{
      darkMode()
    }
  }

  return (
    <ThemeContextProvider value={{ theme, lightMode, darkMode }}>
      <WeatherDataContextProvider>
        <SearchProvider>
          <ForecastProvider>
            <div className={`flex flex-col h-screen w-full bg-cover bg-center ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}`}>
              <div className="h-[8vh] lg:h-[14%] w-full flex">
                <div className="w-full h-full hidden lg:block">
                  <Header />
                </div>
                <div className="w-[75%] md:w-1/2 lg:hidden  h-full flex justify-center items-center">
                  <p className='w-4/5 font-oleo'>
                    <a href="https://github.com/avhixorin" className='w-4/5 font-thin text-white text-lg md:text-2xl pl-[10%] hover:text-slate-400'>avhixorin</a>
                  </p>
                </div>
                <div className="w-[25%] md:w-1/2 lg:hidden h-full flex justify-center items-center relative">
                  <img
                    className="w-[30px] h-[30px] md:hidden"
                    src="./src/assets/bar.png"
                    alt=""
                    onClick={handleBarClick}
                  />
                  {isDropdownVisible && (
                    <div className="absolute top-full z-50 mt-2 w-full md:w-1/2 md:hidden bg-white shadow-lg rounded-md">
                      <ul className="flex flex-col">
                        <li
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={handleBarSearchClick}
                        >
                          Search
                        </li>
                        <li
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={handleModeClick}
                        >
                          Mode
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="w-[90%] h-[90%] hidden md:block lg:hidden">
                      <div className="w-full h-full flex justify-end items-center">
                        <ToggleSwitch />
                      </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:hidden">
                {isSearchBarVisible && <SearchBar />}
              </div>
              <div className="w-full hidden px-6 md:block lg:hidden">
                <SearchBar />
              </div>
              <div className="w-full flex flex-grow">
                  <div className="w-1/2 h-full hidden lg:block">
                      <div className="w-full h-full flex justify-center items-center">
                        <CurrentData />
                      </div>
                        
                  </div>
                  <div className="w-1/2 h-full hidden lg:block">
                      <div className="w-full h-full flex justify-center items-end">
                        <div className="w-full h-[90%] flex flex-col justify-center items-center">
                            <div className="w-[90%] h-[90%] flex justify-center items-center">
                              <ForcastData />
                            </div>
                            <div className="w-4/5 h-[10%] flex justify-end items-start">
                              <p className='w-4/5 text-right font-oleo font-thin text-white text-2xl pl-[10%] hover:text-slate-400'>
                                Developed by avhixorin
                              </p>
                            </div>

                        </div>
                        
                      </div>
                  </div>
                 <div className="w-full h-full hidden md:block lg:hidden">
                      <div className="w-full h-[80%] flex flex-row justify-center items-center">
                        <div className="w-[40%] h-[75%] grid place-items-center">
                            <CurrentData />
                        </div>
                        <div className="flex-grow h-full grid place-items-center rounded-2xl">
                            <ForcastData />
                        </div>
                      </div>
                      <div className="w-full h-[20%] grid place-items-center">
                          <p className='w-4/5 text-right font-oleo font-thin text-white text-2xl pl-[10%] hover:text-slate-400'>
                            Developed by avhixorin
                          </p>
                      </div>
                  </div>
                  <div className="w-full h-full md:hidden">
                    <div className="w-full h-1/2 md:hidden flex justify-center items-center">

                      <CurrentData />
                    </div>
                    <div className="w-full h-1/2 md:hidden flex justify-center    items-center">
                      <ForcastData />
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
