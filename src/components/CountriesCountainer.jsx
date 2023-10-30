import Flag from './Flag'
import SearchFilter from "./Search_Filter";
import '../sass/search_filter.sass'
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

export default function CountriesContainer() {
    const [countriesInfo, setCountriesInfo] = useState([]);
    const [randomCountries, setRandomCountries] = useState([]);
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

    return(
        <div className="general-container">
          <SearchFilter handleInput={handleInput} handleSelect={handleSelect}/>
          <div className="flags-main-container ">
          {inputInfo === '' ? (
              randomCountries.map(({ name, flag, population, region, capital }, index) => (
                selectInfo === '' || selectInfo === region ? (
                  <Link to={`/countries/${name}`} key={name}>
                    <Flag
                      key={index}
                      flag={flag}
                      countryName={name}
                      population={population.toLocaleString()}
                      region={region}
                      capital={capital}
                    />
                  </Link>
                ) : null
              ))
            ) : (
              filteredCountries.map(({ name, flag, population, region, capital }, index) => (
                <Link to={`/countries/${name}`} key={name}>
                  <Flag
                    key={index}
                    flag={flag}
                    countryName={name}
                    population={population.toLocaleString()}
                    region={region}
                    capital={capital}
                  />
                </Link>
              )))
            }
        
          </div>
      </div>
      )
}