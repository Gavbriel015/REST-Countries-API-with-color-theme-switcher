import { produce } from "immer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "../sass/flag_landing_page.sass"
import { Link } from "react-router-dom";
import { useTheme } from './ThemeProvider'

// Data
import data from '../data/data.json'

const BackButton = () => {
    let theme = useTheme()
    return (
        <Link to="/" className={`back-button ${theme ? 'dark' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1rem" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            <p>Back</p>
        </Link>
    )
}
export default function FlagLandingPage(){
    const [countryData, setCountryData] = useState(0)
    const [borderCountries, setBorderCountries] = useState([])
    const {name} = useParams()

    const getCountryByAlphaCode= async (alphacode) => {
        let filteredData = data.filter((element) => element.alpha3Code == alphacode)[0]
        setBorderCountries(produce((draft) => {
            draft.push(filteredData.name)
        }))
    }

    function getDataCountry(name){
        let filteredData = data.filter((element) => element.name == name ? true : false)[0]
        if (filteredData.borders){
            filteredData.borders.forEach((alpha3Code) => {
            getCountryByAlphaCode(alpha3Code)
        })
        }else{
            setBorderCountries(['No countries at the borders.'])
        }
        setCountryData(filteredData)
    }

    
    useEffect(() => {
        getDataCountry(name)
    }, [])

    const { flag } = countryData
    let theme = useTheme()

    return (
        <div className={`general-purpose-flag-landing-page-container ${theme ? 'dark' : ''}`}>
        <BackButton/>
        <article className={`landing-page-container ${theme ? 'dark' : ''}`}>
            <div className="flag">
                <img src={flag} alt={`Flag of ${countryData.name}`} />
            </div>
            <aside className="information-container">
                <h1>{countryData.name}</h1>
                <div className="general-data">
                    <div className="general-data-first">
                        <p className="property-title">Native Name:<span className="property">{countryData.nativeName}</span></p>
                        <p className="property-title">Population:<span className="property">{countryData.population}</span></p>
                        <p className="property-title">Region:<span className="property">{countryData.region}</span></p>
                        <p className="property-title">Sub region:<span className="property">{countryData.subregion}</span></p>
                        <p className="property-title">Capital:<span className="property">{countryData.capital}</span></p>
                    </div>
                    <div className="general-data-second">
                        <p className="property-title">Top level domain:<span className="property">{countryData.topLevelDomain}</span></p>
                        <p className="property-title">Currencies:<span className="property">{countryData.currencies == undefined ? '' : countryData.currencies.map(currency => currency.name).join(',')}</span></p>
                        <p className="property-title">Languages:<span className="property">{countryData.languages == undefined ? '' : countryData.languages.map(language => language.name).join(' , ')}</span></p>
                    </div>
                </div>
                <div className="borderCountries">
                    <h3>Border Countries:</h3>
                    <div className="container">
                    {borderCountries.map((country) => <p className="border-country" key={country}>{country}</p>)}
                    </div>
                </div>
            </aside>
        </article>
    </div>
    )
}