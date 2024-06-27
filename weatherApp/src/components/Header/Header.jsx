
import SearchBar from './SearchBar/SearchBar'
import ToggleSwitch from './ToggleSwitch/ToggleSwitch'


function Header() {
  return (
    <div className='w-full h-full flex flex-row'>
        <div className='w-1/2 h-full flex items-end justify-center'>
            <p className='w-4/5'>
                <a href="https://github.com/avhixorin" className='w-4/5 font-bold text-white text-lg pl-[10%] hover:text-slate-400'>avhixorin</a>
            </p>
        </div>
        <div className='w-1/2 h-full flex flex-row'>
            <div className='w-4/5 h-full'>
            <SearchBar />
            </div>
            <div className='w-[20%] h-full flex justify-center items-end'>
              <ToggleSwitch />
            </div>
        </div>
    </div>
  )
}

export default Header
