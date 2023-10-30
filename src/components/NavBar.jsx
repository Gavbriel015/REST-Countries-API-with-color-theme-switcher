import '../sass/navBar.sass'
import { useUpdateTheme } from './ThemeProvider'

export default function NavBar(){
    return (
        <header>
            <nav>
                <p className="logo">Where in the world?</p>
                <button onClick={useUpdateTheme()}><img src="../src/assets/moon-solid.svg" alt="An image of the moon" />Dark mode</button>
            </nav>
        </header>
    )
}