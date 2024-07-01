import SearchBar from './SearchBar/SearchBar';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';

function Header() {
  return (
    <div className='w-full h-full lg:flex lg:flex-row'>
      <div className='w-1/2 h-full flex items-end justify-center'>
        <p className='w-4/5 font-oleo'>
          <a href="https://github.com/avhixorin" className='w-4/5 font-thin text-white text-2xl pl-[10%] hover:text-slate-400'>avhixorin</a>
        </p>
      </div>
      <div className='w-1/2 h-full flex flex-row'>
        <div className='w-4/5 h-full hidden lg:block'>
            <SearchBar />
        </div>

        <div className='w-[20%] h-full flex justify-center items-end'>
          <div className='w-full h-[55%] flex justify-center items-center'>
            <ToggleSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
