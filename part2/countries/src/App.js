import SearchResult from './components/SearchResult';
import countryService from './services/countryService';
import Error from './components/Error'
import { useState } from 'react'

import './App.css';

const App = () => {
  console.log("re-render");

  const [searchValue,setSearchValue] = useState('')
  const [countryList,setCountryList] = useState([])
  const [error,setError] = useState('')

  const handleSearchChange = (e) => {
    console.log('App.handleSearchChange');
    setSearchValue(e.target.value)
    countryService.getCountries(e.target.value)
      .then(response => {
        console.log("App.handleSearcheChange number of results",response.data.length)
        setError('')
        setCountryList(response.data)
      })
      .catch(er => {
        console.log("handleSearchChange catch",er)
        setError("Failed to retrieve list of countries")
       // setCountryList([])
      })
  }

  return (
    <div>
       <Error error={error} /> 
      <label htmlFor='searchField'>Find countries with</label><input id="searchField" value={searchValue} onChange={handleSearchChange}/>
      <SearchResult searchResult={countryList} setCountryList={setCountryList} />
    </div>
  );
}

export default App;
