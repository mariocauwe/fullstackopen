import axios from "axios"
const key = process.env.REACT_APP_WEATHER_API_KEY
const apiUrl1='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const apiUrl2='?unitGroup=metric&include=current&key='

const getCurrentWeather = (location) => {
    return axios.get(`${apiUrl1}${location}${apiUrl2}${key}`)
            .then(response => {
                console.log("currentweather then",response)
                return response.data
            })
            .catch(error => {
                console.log("currentweather catch",error)
                throw error
            })
}
export default {getCurrentWeather}