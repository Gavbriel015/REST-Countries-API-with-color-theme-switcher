import { BrowserRouter, Routes, Route} from "react-router-dom";

import CountriesContainer from "./components/CountriesCountainer";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountriesContainer/>}></Route>
        <Route path="/countries/:name" element={<p>This will be replaced with the second page</p>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
