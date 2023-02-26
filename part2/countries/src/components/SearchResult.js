import CountryNames from '../components/CountryNames'
import CountryDetails from '../components/CountryDetails'

const SearchResult = ({searchResult,setCountryList}) => {
    console.log("SearchResult",searchResult);
    const MAXCOUNTRIES=10

    if(searchResult.length>MAXCOUNTRIES)
        return (<div>Too many matches, update the filter</div>)
    if(searchResult.length===0)
        return (<div>No match, update the filter</div>)
    if(searchResult.length===1)
      return (<CountryDetails country={searchResult[0]}/>)
      
    return (<CountryNames countryList={searchResult} setCountryList={setCountryList}/>)
     
    //return (<CountryNames countryList={searchResult} showDetails={()=>triggerDetails()}/>)
 }

export default SearchResult