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
    <div className="w-[90%] h-[75%] lg:w-[60%] lg:h-[60%] flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-[6px] dark:backdrop-blur-[2px] rounded-2xl px-auto  dark:bg-opacity-10 dark:bg-gray-400">
      <div className="w-4/5 h-4/5 rounded-lg flex justify-evenly items-start flex-col">
        <div className="flex flex-row w-4/5 lg:gap-4 items-center justify-center lg:justify-between">

          <div className="w-full text-6xl lg:text-8xl text-gray-300 font-bold flex justify-start items-center dark:text-gray-100">

            {searchCityName ? `${Math.floor(searchTemp)}°C` : currentCityName ? `${Math.floor(currentTemp)}°C` : 'Loading...'}

          </div>
          <div className="h-full w-5% hidden md:block lg:w-full ">
            <div className="w-full h-full flex justify-center items-center ">
              {searchCityName ? getWeatherIcon(searchWeatherDesc) : getWeatherIcon(currentWeatherDesc)}
            </div>
            
          </div>
        </div>
        <div className="w-full text-gray-300 text-2xl lg:text-4xl font-semibold dark:text-gray-100">
          <p>
            {searchCityName || currentCityName ? `${searchCityName || currentCityName}, ${searchCountryName || currentCountryName}` : 'Loading...'}
          </p>
        </div>
        <div className="w-full text-gray-200 text-lg dark:text-gray-100">
          <p className="hidden md:block">
            Feels like: {searchFeelsLike !== undefined ? `${Math.floor(searchFeelsLike)}°C` : currentFeelsLike !== undefined ? `${Math.floor(currentFeelsLike)}°C` : '...'} | 
            Humidity: {searchHumidity !== undefined ? `${searchHumidity}%` : currentHumidity !== undefined ? `${currentHumidity}%` : '...'} | 
            Wind: {searchWindSpeed !== undefined ? `${searchWindSpeed} m/s` : currentWindSpeed !== undefined ? `${currentWindSpeed} m/s` : '...'}
          </p>
          <p className="md:hidden">
            Feels like: {searchFeelsLike !== undefined ? `${Math.floor(searchFeelsLike)}°C` : currentFeelsLike !== undefined ? `${Math.floor(currentFeelsLike)}°C` : '...'} | 
            Humidity: {searchHumidity !== undefined ? `${searchHumidity}%` : currentHumidity !== undefined ? `${currentHumidity}%` : '...'} 
          
          </p>
        </div>
        <div className="w-full text-gray-200 text-xl dark:text-gray-100">
          <p>
            {searchWeatherDesc || currentWeatherDesc} | AQI: {searchAqi !== undefined ? searchAqi : currentAqi !== undefined ? currentAqi : '...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentData;
