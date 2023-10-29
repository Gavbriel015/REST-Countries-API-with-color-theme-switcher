import Flag from "./components/Flag";
import SearchFilter from "./components/Search_Filter";
import './sass/search_filter.sass'

import { useState, useEffect } from "react";

function App() {
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [randomContries, setRandomCountries] = useState([]);
  const [inputInfo, setInputInfo] = useState('');
  const [selectInfo, setSelectInfo] = useState('');

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

  const handleInput = (e) => {
    setInputInfo(e.target.value);
  }
  const handleSelect = (e) => {
    setSelectInfo(e.target.value);
    
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

  function searchCountries(data, inputInfo, selectInfo) {
    const searchTerm = inputInfo.toLowerCase();
    const regionFilter = selectInfo.toLowerCase();
  
    return data.filter((country) => {
      const nameMatch = country.name.toLowerCase().startsWith(searchTerm);
      const regionMatch = regionFilter === "" || country.region.toLowerCase() === regionFilter;
      return nameMatch && regionMatch;
    });
  }


  const filteredCountries = searchCountries(countriesInfo, inputInfo, selectInfo);


  return (
    <>
      <div className="general-container">
        <SearchFilter handleInput={handleInput} handleSelect={handleSelect}/>
        <div className="flags-main-container">
          {inputInfo === '' ? (

            randomContries.map(({ name, flag, population, region, capital }, index) => (
              <Flag 
                key={index}
                flag={flag}
                countryName={name}
                population={population}
                region={region}
                capital={capital}
              />    
            ))
          ) : (
            filteredCountries.map(({ name, flag, population, region, capital }, index) => (
              <Flag 
                key={index}
                flag={flag}
                countryName={name}
                population={population}
                region={region}
                capital={capital}
              />    
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
