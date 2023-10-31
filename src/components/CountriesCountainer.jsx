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