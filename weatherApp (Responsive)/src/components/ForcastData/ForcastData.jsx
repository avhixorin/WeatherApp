import { useContext } from "react";
import { ForecastContext } from "../contexts/forecastContext/ForecastContext";
import WeatherDataContext from "../contexts/weatherDataContexts/WeatherDataContext";
import {
  SunnySvg,
  CloudySvg,
  RainySvg,
  ThunderSvg,
  HazySvg,
  WindySvg,
} from "./SvgsSmall/SvgComponents";

function ForecastData() {
  const { forecastData, isLoading, error } = useContext(ForecastContext);
  const {
    currentCityWeather,
    searchCityWeatherData,
    searchValue,
    currentCity,
  } = useContext(WeatherDataContext);

  // Use weather data based on whether the user searched for a city or is viewing the current city
  const relevantWeatherData = searchValue ? searchCityWeatherData : currentCityWeather;
  const { windSpeed: relevantWindSpeed } = relevantWeatherData || {};

  // Get the weather icon based on the description and wind speed
  const getWeatherIcon = (description, windSpeed) => {
    if (windSpeed >= 10) return <WindySvg />;

    switch (description?.toLowerCase()) {
      case "clear sky":
        return <SunnySvg />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return <CloudySvg />;
      case "shower rain":
      case "rain":
      case "moderate rain":
      case "heavy intensity rain":
        return <RainySvg />;
      case "thunderstorm":
      case "thunderstorm with rain":
      case "thunderstorm with heavy rain":
        return <ThunderSvg />;
      case "hazy":
      case "haze":
        return <HazySvg />;
      default:
        return <CloudySvg />;
    }
  };

  // Loading and error states
  if (isLoading) {
    return <div className="text-gray-300 dark:text-white text-4xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-gray-300 dark:text-white">Error: {error}</div>;
  }

  // Rendering the forecast data
  return (
    <div className="w-[90%] h-full md:h-[75%] bg-black bg-opacity-20 backdrop-blur-[6px] dark:backdrop-blur-[2px] dark:bg-gray-400 rounded-2xl flex justify-center items-center dark:bg-opacity-10">
      <div className="w-[90%] h-[90%] rounded-lg bg-transparent">
        <div className="w-full h-[15%] bg-transparent flex items-center">
          <p className="text-gray-300 text-lg md:text-xl dark:text-gray-100">
            5-Day forecast of - {(searchValue || currentCity).toUpperCase()}
          </p>
        </div>

        <hr className="border-t-1 border-gray-400 rounded-lg w-full dark:border-gray-600" />

        <div className="w-full h-[85%] bg-transparent py-4">
          <ul className="w-full h-full flex flex-col justify-evenly space-y-2">
            {forecastData.list.map((day, index) => {
              const forecastDate = new Date(day.dt_txt);

              // Adjust this part for accurate timezone conversion if necessary
              const dayOfWeekShort = forecastDate.toLocaleDateString(undefined, {
                weekday: "short",
              });
              const dayOfWeekLong = forecastDate.toLocaleDateString(undefined, {
                weekday: "long",
              });

              return (
                <li
                  key={index}
                  className="w-full h-auto flex items-center justify-between space-x-4"
                >
                  {/* Short day of the week (shown on smaller screens) */}
                  <div className="w-[15%] h-full flex items-center justify-start text-gray-300 text-base md:hidden dark:text-gray-100">
                    {dayOfWeekShort}
                  </div>

                  {/* Full day of the week (shown on medium and larger screens) */}
                  <div className="hidden md:flex w-[20%] h-full items-center justify-start text-gray-300 text-base dark:text-gray-100">
                    {dayOfWeekLong}
                  </div>

                  {/* Weather Icon */}
                  <div className="w-[15%] lg:w-[10%] h-full flex items-center justify-start text-gray-300 dark:text-gray-100">
                    {getWeatherIcon(day.weather[0].description, relevantWindSpeed)}
                  </div>

                  {/* Weather Description */}
                  <div className="w-[50%] md:w-[40%] h-full flex items-center justify-end md:justify-start text-gray-300 text-base md:text-[1.1rem] dark:text-gray-100">
                    {day.weather[0].description}
                  </div>

                  {/* Temperature */}
                  <div className="hidden md:flex w-[25%] h-full items-center justify-end md:justify-start text-gray-300 text-[1rem] dark:text-gray-100">
                    H: {Math.floor(day.main.temp_max)}°C | L: {Math.floor(day.main.temp_min)}°C
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ForecastData;
