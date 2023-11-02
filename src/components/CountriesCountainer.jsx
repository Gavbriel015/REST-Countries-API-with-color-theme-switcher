import Flag from './Flag'
import SearchFilter from "./Search_Filter";
import '../sass/search_filter.sass'
import { Link } from "react-router-dom";

import { useTheme } from './ThemeProvider';

import { useState, useEffect } from "react";

import data from '../data/data.json'

export default function CountriesContainer() {
    const [countriesInfo, setCountriesInfo] = useState([]);
    const [randomCountries, setRandomCountries] = useState([]);
    const [inputInfo, setInputInfo] = useState('');
    const [selectInfo, setSelectInfo] = useState('');
    const theme = useTheme();

    useEffect(() => {
        getDataCountries();
    }, []);

    useEffect(() => {
      if (theme) {
        document.body.style.backgroundColor = "#202c36";
      } else {
        document.body.style.backgroundColor = "";
      }
    },[theme])
    

    function getDataCountries() {
        setCountriesInfo(data)
        getRandomCountries(data)
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

    function getRandomCountriesByRegion(data, region) {
        const regionCountries = data.filter(country => country.region.toLowerCase() === region.toLowerCase());
    
        if (regionCountries.length <= 8) {
            return regionCountries;
        }
    
        const regionCountriesCopy = [...regionCountries];
        const randomCountries = [];
    
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * regionCountriesCopy.length);
            const randomCountry = regionCountriesCopy.splice(randomIndex, 1)[0];
            randomCountries.push(randomCountry);
        }
        return randomCountries;
    }
    
    const region = selectInfo;
    const randomCountriesByRegion = getRandomCountriesByRegion(countriesInfo, region);

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
        <div className={`general-container ${theme ? 'dark' : 'light'}`}>
          <SearchFilter handleInput={handleInput} handleSelect={handleSelect}/>
          <div className="flags-main-container ">
          {inputInfo === '' ? (
              selectInfo === '' ? (randomCountries.map(({ name, flag, population, region, capital }, index) => (
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
            ))) : (randomCountriesByRegion.map(({ name, flag, population, region, capital }, index) => (
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