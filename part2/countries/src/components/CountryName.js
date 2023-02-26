const CountryName = ({country,onClick}) => {
    console.log("CountryName",country);

    return ( <li>{country.name.common} <button onClick={onClick}>Show</button></li>)
}

export default CountryName