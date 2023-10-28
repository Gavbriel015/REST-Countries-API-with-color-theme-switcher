import '../sass/flag.sass'

// eslint-disable-next-line react/prop-types
export default function Flag({flag ,countryName, population, region, capital}){


    return (
        <>
            <div className="container">
                <div className="flag-container">
                    <img className='flag' src={flag} alt="Country Flag" />
                </div>
                <div className="information-container">
                    <h2 className='countryName'>{countryName}</h2>
                    <h2><span>Population:</span> {population}</h2>
                    <h2><span>Region:</span> {region}</h2>
                    <h2><span>Capital:</span> {capital}</h2>
                </div>
            </div>
            
        </>
    )
}