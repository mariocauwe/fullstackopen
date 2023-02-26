import CountryName from '../components/CountryName'

const updateList = (country,setCountryList) => {
    console.log("updateList",country)
    setCountryList([country])
}

const CountryNames = ({countryList,setCountryList}) => {
    console.log("CountryNames",countryList);
      
    return (
        <ul>
           { countryList.map(country => <CountryName key={country.cca2} country={country} onClick={()=>updateList(country,setCountryList)}/>) }
        </ul>
    )
 }

export default CountryNames