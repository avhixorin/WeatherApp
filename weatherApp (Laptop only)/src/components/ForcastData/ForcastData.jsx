import { useContext } from "react";
import { ForecastContext } from "../contexts/forecastContext/ForecastContext";
import WeatherDataContext from "../contexts/weatherDataContexts/WeatherDataContext";
import { SunnySvg, CloudySvg, RainySvg, ThunderSvg, HazySvg, WindySvg } from "./SvgsSmall/SvgComponents";

function ForecastData() {
  const { forecastData, isLoading, error } = useContext(ForecastContext);
  const { currentCityWeather, searchCityWeatherData, searchValue, currentCity } = useContext(WeatherDataContext);

  const {
    windSpeed: currentWindSpeed,
  } = currentCityWeather || {};

  const {
    windSpeed: searchWindSpeed,
  } = searchCityWeatherData || {};

  const getWeatherIcon = (description, windSpeed) => {
    if (windSpeed >= 10) return <WindySvg />;

    switch (description?.toLowerCase()) {
      case 'clear sky':
        return <SunnySvg />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <CloudySvg />;
      case 'shower rain':
      case 'rain':
      case 'moderate rain':
      case 'heavy intensity rain':
        return <RainySvg />;
      case 'thunderstorm':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
        return <ThunderSvg />;
      case 'hazy':
      case 'haze':
        return <HazySvg />;
      default:
        return <CloudySvg />;
    }
  };

  if (isLoading) {
    return <div className="text-[#071952] dark:text-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="text-[#071952] dark:text-gray-100">Error: {error}</div>;
  }

  return (
    <div className="w-[90%] h-full md:h-[75%] bg-black bg-opacity-20 backdrop-blur-[6px] dark:backdrop-blur-[2px] dark:bg-gray-400 rounded-2xl flex justify-center items-center  dark:bg-opacity-10">
      
      <div className="w-[90%] h-[90%] rounded-lg bg-transparent">
        <div className="w-full h-[15%] bg-transparent flex items-center">
          <p className="text-gray-300 text-lg md:text-xl dark:text-gray-100">5-Day forecast of - { (searchValue || currentCity).toUpperCase() }</p>
        </div>

        <hr className="border-t-1 border-gray-400 rounded-lg w-full dark:border-gray-600" />

        <div className="w-full h-[85%] bg-transparent py-4">
          <ul className="w-full h-full flex flex-col justify-evenly">
            {forecastData.data.map((day, index) => (
              <li key={index} className="w-full h-full flex justify-between">
                <div className="w-[10%] md:hidden h-full flex items-center justify-start text-gray-300 text-base md:text-lg dark:text-gray-100">
                  {new Date(day.datetime).toLocaleDateString(undefined, { weekday: 'long' }).slice(0, 3)}
                </div>
                <div className="hidden w-[20%] md:block h-full flex items-center justify-start text-gray-300 text-base md:text-lg dark:text-gray-100">
                  {new Date(day.datetime).toLocaleDateString(undefined, { weekday: 'long' })}
                </div>

                <div className="w-[15%] hidden lg:block h-full flex items-center justify-start text-gray-300 dark:text-gray-100">
                  {getWeatherIcon(day.weather.description, currentWindSpeed || searchWindSpeed)}
                </div>
                <div className="w-[90%] md:w-[40%] h-full flex items-center justify-end md:justify-start text-gray-300 text-base md:text-[1.1rem] dark:text-gray-100">
                  {day.weather.description}
                </div>
                <div className="w-[25%] hidden md:block h-full flex items-center justify-start text-gray-300 text-[1rem] dark:text-gray-100">
                  H: {Math.floor(day.high_temp)}°C | L: {Math.floor(day.low_temp)}°C
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ForecastData;
