import { produce } from "immer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "../sass/flag_landing_page.sass"
import { Link } from "react-router-dom";

const BackButton = () => {
    return (
        <Link to="/" className="back-button">
            <img src="../src/assets/arrow-left-solid.svg" alt="" />
            <p>Back</p>
        </Link>
    )
}
export default function FlagLandingPage(){
    const [countryData, setCountryData] = useState(0)
    const [borderCountries, setBorderCountries] = useState([])
    const {name} = useParams()
    console.log(name)
    const path = '../src/data/data.json'

    const getCountryByAlphaCode= async (alphacode) => {
        fetch(path)
        .then(res => res.json())
        .then(data => {
            data = data.filter((element) => element.alpha3Code == alphacode)[0]
            setBorderCountries(produce((draft) => {
                draft.push(data.name)
            }))
        })
    }

    function getDataCountry(name){
        fetch(path)
        .then(res => res.json())
        .then(data => {
            data = data.filter((element) => element.name == name ? true : false)[0]
            if (data.borders){
                data.borders.forEach((alpha3Code) => {
                    getCountryByAlphaCode(alpha3Code)
                })
            }else{
                setBorderCountries(['No countries at the borders.'])
            }
            setCountryData(data)
        })
    }

    
    useEffect(() => {
        getDataCountry(name)
    }, [])
    return (
        <article className="landing-page-container">
            <BackButton/>
            <div className="flag">
                <img src={countryData.flag} alt={`Flag of ${countryData.name}`} />
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
    )
}