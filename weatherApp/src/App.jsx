import { useContext } from "react";
import CurrentData from "./components/CurrentData/CurrentData.jsx";
import ForcastData from "./components/ForcastData/ForcastData.jsx";
import Header from "./components/Header/Header.jsx";
import { ForecastProvider } from "./components/contexts/forecastContext/ForecastContext.jsx";
import { SearchProvider } from "./components/contexts/searchContexts/SearchContext.jsx";

import WeatherDataContextProvider from './components/contexts/weatherDataContexts/WeatherDataContextProvider.jsx'



function App() {
  
  return (
    <WeatherDataContextProvider>
      <SearchProvider>
        <ForecastProvider>
          <div className="w-full h-full flex flex-col ">
            <div className="w-full h-[14%]">
              <Header />
            </div>
            <div className="w-full h-[86%] flex flex-row ">
              <div className="w-1/2 h-full flex justify-center items-center">
                <CurrentData />
              </div>
              <div className="w-1/2 h-full flex justify-start items-center">
                <ForcastData />
              </div>
            </div>
          </div>
        </ForecastProvider>
      </SearchProvider>
    </WeatherDataContextProvider>
  );
}

export default App;
