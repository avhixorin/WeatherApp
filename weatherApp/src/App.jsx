import { useContext, useEffect, useState } from "react"
import CurrentData from "./components/CurrentData/CurrentData.jsx"
import ForcastData from "./components/ForcastData/ForcastData.jsx"
import Header from "./components/Header/Header.jsx"
import WeatherDataContext from "./components/contexts/WeatherDataContext.js"
import WeatherDataContextProvider from "./components/contexts/WeatherDataContextProvider.jsx"




function App() {

  

  return (
    <WeatherDataContextProvider>

    <div className="w-full h-full bg-page-bg bg-cover bg-center flex flex-col">
      <div className="w-full h-[14%]">
        <Header />
      </div>
      <div className="w-full h-[86%] flex flex-row">
        <div className="w-1/2 h-full">
          <CurrentData/>
        </div>
        <div className="w-1/2 h-full">
          <ForcastData />
        </div>
      </div>
    </div>

    </WeatherDataContextProvider>
  )
}

export default App
