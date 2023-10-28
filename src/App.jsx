import Flag from "./components/Flag";
import SearchFilter from "./components/Search_Filter";
import './sass/search_filter.sass'

import { useState, useEffect } from "react";

function App() {
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [randomContries, setRandomCountries] = useState([]);

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

  console.log(randomContries)

  return (
    <>
      <div className="general-container">
        <SearchFilter/>
        <div className="">
        {randomContries.map(({name, flag, population, region, capital}, index) => (
            <Flag 
            key={index}
            flag={flag}
            countryName={name}
            population={population}
            region={region}
            capital={capital}
            />    
        ))}
      
        </div>
      </div>
      
    </>
  );
}

export default App;
