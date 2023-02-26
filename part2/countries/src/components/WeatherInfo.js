import { useState } from "react";
import weatherService from "../services/weatherService"

const WeatherInfo = ({city}) => {
    const [temp,setTemp] = useState()
    const [wind,setWind] = useState()
    const [icon,setIcon] = useState('')
    
    console.log("WeatherInfo");
    weatherService.getCurrentWeather(city)
    .then(response => {
        console.log("Weather information received", response)
        setTemp(response.currentConditions.temp)
        setWind(response.currentConditions.windspeed)
        setIcon(response.currentConditions.icon)
    })
    .catch(error => {
        console.error("Failed to get weather information from remote service")
        return
    })
    return (
        <div>
            <h3>Weather in {city}</h3>
            Temperature {temp} Celcuis<br/>
            <img src="" alt={icon}/><br/>
            Wind {wind} m/s
        </div>
    )
}

export default WeatherInfo