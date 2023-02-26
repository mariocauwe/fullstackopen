import axios from 'axios'

const restCountriesURL = 'https://restcountries.com/v3.1/name/'

const getCountries =(filter) => {
    return axios.get(`${restCountriesURL}${filter}`)
         .then(response => {
            console.log("getCountries then",response)
            return response
         })
         .catch(error => {
            console.log("getCountries catch",error)
            throw error
         })
}

export default {getCountries}