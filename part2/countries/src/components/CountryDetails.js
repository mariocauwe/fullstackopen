import WeatherInfo from "./WeatherInfo";

const CountryDetails = country => {
    console.log("CountryDetails", country);
    const languages = country.country.languages
    const flags = country.country.flags
    const capital = country.country.capital[0]

    return(
        <div>
            <h1>{country.country.name.common}</h1> 
             capital {capital}
             <br/>
            area {country.country.area} 
            <h3>Languagues</h3> 
            <ul>
                { Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>) }
            </ul> 
            <img src={flags.png} alt={flags.alt} />
            <WeatherInfo city={capital} />
        </div>
    )
}

export default CountryDetails