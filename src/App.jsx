import { BrowserRouter, Routes, Route} from "react-router-dom";
import FlagLandingPage from "./components/Flag_landing_page";
import CountriesContainer from "./components/CountriesCountainer";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeProvider";


function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<CountriesContainer/>}></Route>
          <Route path="/countries/:name" element={<FlagLandingPage/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
