import { BrowserRouter, Routes, Route} from "react-router-dom";
import FlagLandingPage from "./components/Flag_landing_page";
import CountriesContainer from "./components/CountriesCountainer";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountriesContainer/>}></Route>
        <Route path="/countries/:name" element={<FlagLandingPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
