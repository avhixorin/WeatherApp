
import CurrentData from "./components/CurrentData/CurrentData.jsx"
import ForcastData from "./components/ForcastData/ForcastData.jsx"
import Header from "./components/Header/Header.jsx"
import { SearchProvider } from "./components/contexts/searchContexts/SearchContext.jsx"
import WeatherDataContextProvider from "./components/contexts/WeatherDataContextProvider.jsx"




function App() {

  

  return (
    <WeatherDataContextProvider>
      <SearchProvider >
          <div className="w-full h-full bg-page-bg bg-cover bg-center flex flex-col ">
              <div className="w-full h-[14%]">
                <Header />
              </div>
              <div className="w-full h-[86%] flex flex-row ">
                  <div className="w-1/2 h-full flex justify-center items-center">
                      <CurrentData/>
                  </div>
                  <div className="w-1/2 h-full z-10">
                      <ForcastData />
                  </div>
              </div>
          </div>
      </SearchProvider>
    </WeatherDataContextProvider>
  )
}

export default App
