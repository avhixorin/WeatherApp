import useTheme from "../../contexts/themeContext/ThemeContext";

const ToggleSwitch = () => {

  const {theme, lightMode, darkMode} = useTheme()

  const onChangeHandle = (e) => {
    const darkModeStatus = e.currentTarget.checked

    if(darkModeStatus) {
      darkMode()
    } else{
      lightMode()
    }

  }
  return (
    <label className="relative inline-block w-12 h-7 lg:w-16 lg:h-9">
  <input
    type="checkbox" 
    className="opacity-0 w-0 h-0 peer" 
    value=""
    onChange={onChangeHandle}
    checked={theme === 'dark'}
  />
  <span className="absolute inset-0 cursor-pointer bg-gray-300 transition-colors duration-300 rounded-full peer-checked:bg-gray-800"></span>
  <span className="absolute left-1 top-1 h-5 w-5 lg:h-7 lg:w-7 rounded-full bg-gray-500 shadow-md transition-transform duration-300 peer-checked:translate-x-5 lg:peer-checked:translate-x-7 cursor-pointer"></span>
</label>

  );
};

export default ToggleSwitch;
