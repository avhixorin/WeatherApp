import {createContext, useContext} from 'react'

export const ThemeContext = createContext({
    theme: 'light',
    darkMode: () => {},
    lightMode: () => {},
});

export const ThemeContextProvider = ThemeContext.Provider
const useTheme = () => {
    return useContext(ThemeContext)
}

export default useTheme;
