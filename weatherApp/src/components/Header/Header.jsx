
import SearchBar from './SearchBar/SearchBar'


function Header() {
  return (
    <div className='w-full h-full flex flex-row'>
      <div className='w-1/2 h-full flex flex-col-reverse'>
        <p className=''>
            <a href="https://github.com/avhixorin" className='font-bold text-white p-[25%] text-lg hover:text-slate-400'>avhixorin</a>
        </p>
      </div>
      <div className='w-1/2 h-full'>
        <SearchBar />
      </div>
    </div>
  )
}

export default Header
