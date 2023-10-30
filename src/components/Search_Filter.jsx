import '../sass/search_filter.sass'

// eslint-disable-next-line react/prop-types
export default function SearchFilter({handleInput, handleSelect}) {



    return(
        
        <div className='search-and-filter'>
            <div className='search-container'>
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input onInput={handleInput} placeholder='Search for a country...' type="text" />
            </div>
            <div className='filter-container'>
                <select onChange={handleSelect} name="a" id="" placeholder='Filter' defaultValue={"Filter by Region"}>
                    <option value="" className='hidden'>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Ocenia">Ocenia</option>
                </select>
            </div>
        </div>
        
            
    )
}