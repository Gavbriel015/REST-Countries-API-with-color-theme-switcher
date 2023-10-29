import Flag from "./components/Flag";
import SearchFilter from "./components/Search_Filter";
import './sass/search_filter.sass'

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function CountriesContainer (){
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [randomCountries, setRandomCountries] = useState([]);

  useEffect(() => {
    getDataCountries();
  }, []);

  function getDataCountries() {
    const path = './src/data/data.json';
    fetch(path)
      .then(res => res.json())
      .then(data => {
        setCountriesInfo(data)
        getRandomCountries(data);
      });
    
    
  }
  function getRandomCountries(data) {
    const numCountries = 8;
    const randomCountries = [];
    for (let i = 0; i < numCountries; i++) {
      const numRandom = Math.floor(Math.random() * data.length);      
      randomCountries.push(data[numRandom]);
    }
    setRandomCountries(randomCountries);
  }

  return (
    <div className="general-container">
        <SearchFilter/>
        <div className="">
        {randomCountries.map(({name, flag, population, region, capital}, index) => (
          <Link to={`/countries/${name}`} key={name}>
            <Flag 
            flag={flag}
            countryName={name}
            population={population}
            region={region}
            capital={capital}
            />
          </Link>    
        ))}
      
        </div>
    </div>
  )
}
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
