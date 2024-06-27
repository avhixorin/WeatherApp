
const ToggleSwitch = () => {
  return (
    <div className="w-full h-[50%] flex items-center justify-center">
        <label className="relative inline-block w-16 h-9">
        <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
        <span className="absolute inset-0 cursor-pointer bg-gray-300 transition-colors duration-300 rounded-full peer-checked:bg-green-400"></span>
        <span className="absolute left-1 top-1 cursor-pointer h-7 w-7 rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-7"></span>
      </label>
    </div>
    
  );
};

export default ToggleSwitch;
