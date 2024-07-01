import { useContext } from 'react';
import WeatherDataContext from '../../contexts/weatherDataContexts/WeatherDataContext';
import { SearchContext } from '../../contexts/searchContexts/SearchContext';

function SearchBar() {
  const { setSearchValue } = useContext(WeatherDataContext);
  const {
    inputData,
    setInputData,
    cityData,
    showSuggestions,
    handleSuggestionClick
  } = useContext(SearchContext);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(inputData);
    setInputData('');
  };

  return (
    <div className='w-full h-full flex flex-col justify-end'>
      <form className="w-full relative" onSubmit={handleSearch}>
        <div className="w-full">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only">Search</label>
          <div className="relative">
            <input 
              type="search" 
              id="default-search" 
              className="block w-full p-4 pl-10 text-sm text-black
                        placeholder-gray-600 
                          bg-opacity-10 backdrop-blur-[2px]
                         border border-gray-300 rounded-lg bg-transparent 
                         focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-400
                         dark:backdrop-blur-[2px]
                         dark:text-white dark:border-gray-600 dark:placeholder-gray-400  dark:bg-opacity-10 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search City" 
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
              required 
            />
            <button 
              type="submit" 

              className="text-white hidden md:block absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                         focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </div>
        {showSuggestions && cityData.length > 0 && (
          <ul className="absolute w-full border border-gray-300 rounded-lg mt-2 bg-white bg-opacity-5 backdrop-blur-sm text-white z-50
                         dark:border-gray-600 dark:bg-gray-800 dark:bg-opacity-75 dark:z-50">
            {cityData.map((city, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer rounded-lg hover:bg-white hover:bg-opacity-5 hover:backdrop-blur-sm text-white"
                onClick={() => handleSuggestionClick(city.name)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
