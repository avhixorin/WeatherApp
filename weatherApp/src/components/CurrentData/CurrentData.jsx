import { useContext } from "react";
import WeatherDataContext from "../contexts/weatherDataContexts/WeatherDataContext";
import { WindySvg, SunnySvg, HazySvg, ThunderSvg, CloudySvg, RainySvg } from "../SvgComponents";

const CurrentData = () => {
  const { currentCityWeather, searchCityWeatherData } = useContext(WeatherDataContext);

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

  const getWeatherIcon = (description) => {
    if (currentWindSpeed >= 10 || searchWindSpeed >= 10) return <WindySvg />;

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
      case 'light intensity shower rain':
        return <RainySvg />;
      case 'thunderstorm':
        return <ThunderSvg />;
      case 'hazy':
      case 'haze':
      case 'mist':
        return <HazySvg />;
      default:
        return <CloudySvg />;
    }
  };

  return (
    <div className="w-[60%] h-[60%] flex flex-col items-center justify-center gap-6 bg-white bg-opacity-5 backdrop-blur-sm dark:backdrop-blur-[2px] rounded-2xl px-auto  dark:bg-opacity-10 dark:bg-gray-400">
      <div className="flex flex-row w-4/5 items-center justify-between">
        <div className="text-8xl text-[#00000090] font-bold flex justify-start items-center dark:text-gray-100">
          {searchCityName ? `${Math.floor(searchTemp)}°C` : currentCityName ? `${Math.floor(currentTemp)}°C` : 'Loading...'}
        </div>
        <div className="h-full w-full flex justify-center items-end">
          {searchCityName ? getWeatherIcon(searchWeatherDesc) : getWeatherIcon(currentWeatherDesc)}
        </div>
      </div>
      <div className="w-4/5 text-[#00000090] text-3xl font-semibold dark:text-gray-100">
        <p>
          {searchCityName || currentCityName ? `${searchCityName || currentCityName}, ${searchCountryName || currentCountryName}` : 'Loading...'}
        </p>
      </div>
      <div className="w-4/5 text-[#00000090] text-lg dark:text-gray-100">
        <p>
          Feels like: {searchFeelsLike !== undefined ? `${Math.floor(searchFeelsLike)}°C` : currentFeelsLike !== undefined ? `${Math.floor(currentFeelsLike)}°C` : '...'} | 
          Humidity: {searchHumidity !== undefined ? `${searchHumidity}%` : currentHumidity !== undefined ? `${currentHumidity}%` : '...'} | 
          Wind: {searchWindSpeed !== undefined ? `${searchWindSpeed} m/s` : currentWindSpeed !== undefined ? `${currentWindSpeed} m/s` : '...'}
        </p>
      </div>
      <div className="w-4/5 text-[#00000090] text-xl dark:text-gray-100">
        <p>
          {searchWeatherDesc || currentWeatherDesc} | AQI: {searchAqi !== undefined ? searchAqi : currentAqi !== undefined ? currentAqi : '...'}
        </p>
      </div>
    </div>
  );
};

export default CurrentData;
