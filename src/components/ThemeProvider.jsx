import { createContext, useContext, useState } from "react";

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()


export function useTheme(){
    return useContext(ThemeContext)
}
export function useUpdateTheme(){
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }){

    const [darkTheme, setDarkTheme ] = useState(false)

    function toogleTheme(){
        setDarkTheme(prevDarkTheme => !prevDarkTheme)
    }
    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toogleTheme}>
                { children} 
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}