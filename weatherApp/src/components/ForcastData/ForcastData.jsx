import { useContext } from "react";
import { ForecastContext } from "../contexts/forecastContext/ForecastContext";
import WeatherDataContext from "../contexts/weatherDataContexts/WeatherDataContext";
import { SunnySvg, CloudySvg, RainySvg, ThunderSvg, HazySvg, WindySvg } from "./SvgsSmall/SvgComponents";

function ForecastData() {
  const { forecastData, isLoading, error } = useContext(ForecastContext);
  const { currentCityWeather, searchCityWeatherData, searchValue, currentCity } = useContext(WeatherDataContext);

  // Destructure currentCityWeather
  const {
    currentTemperature: currentTemp,
    aqi: currentAqi,
    weatherDescription: currentWeatherDesc,
    feelsLike: currentFeelsLike,
    cityName: currentCityName,
    countryName: currentCountryName,
    windSpeed: currentWindSpeed,
    humidity: currentHumidity
  } = currentCityWeather || {};

  // Destructure searchCityWeatherData
  const {
    currentTemperature: searchTemp,
    aqi: searchAqi,
    weatherDescription: searchWeatherDesc,
    feelsLike: searchFeelsLike,
    cityName: searchCityName,
    countryName: searchCountryName,
    windSpeed: searchWindSpeed,
    humidity: searchHumidity
  } = searchCityWeatherData || {};

  const getWeatherIcon = (description, windSpeed) => {
    // Adjust wind condition to show windy icon if wind speed is significant
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
      case 'Thunderstorm with rain':
        return <ThunderSvg />;
      case 'hazy':
      case 'haze':
        return <HazySvg />;
      default:
        return <CloudySvg />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-4/5 h-[75%] bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl flex justify-center items-center'>
      <div className="w-[90%] h-[90%] rounded-lg bg-transparent">
        <div className="w-full h-[15%] bg-transparent flex items-center">
          <p className="text-white text-xl">5-Day forecast of - { searchValue.toUpperCase() || currentCity.toUpperCase() || 'London'}</p>
        </div>

        <hr className="border-t-1 border-gray-400 rounded-lg w-full" />

        <div className="w-full h-[85%] bg-transparent">
          <ul className="w-full h-full flex flex-col justify-evenly">
            {forecastData.data.map((day, index) => (
              <li key={index} className="w-full h-full flex justify-between">
                <div className="w-[25%] h-full flex items-center justify-start text-white text-xl">
                  {new Date(day.datetime).toLocaleDateString(undefined, { weekday: 'long' })}
                </div>
                <div className="w-[15%] h-full flex items-center justify-start text-white text-xl">
                  {getWeatherIcon(day.weather.description, currentWindSpeed || searchWindSpeed)}
                </div>
                <div className="w-[35%] h-full flex items-center justify-start text-white text-xl">
                  {day.weather.description}
                </div>
                <div className="w-[25%] h-full flex items-center justify-start text-white text-xl">
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
