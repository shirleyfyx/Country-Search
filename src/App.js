import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react';
import myPhoto from './image/Color_world_map.png'; 


const Languages = ({languages}) => {
  let keys = Object.keys(languages)
  return (
    <ul>
      {
        keys.map(key => {
          return(
            <li key={key}>
              {languages[key]}
            </li>
          )
        })
      }
    </ul>
  )
}

const Flag = ({flag}) => {
  return (
    <img src={flag} alt = ''/>
  )
}

const Weather = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState(null)
  console.log(api_key)
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
      .then(res => setWeather(res.data))
      .catch(err => console.error(err))
  },[country, api_key])
  if (!weather) {
    return <p>Loading weather data....</p>
  }
  console.log(weather.weather[0].icon)
  return (
    <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>weather: {weather.weather[0].description}</p> 
            <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
            <p>temperature {Math.round(weather.main.temp - 273.15)} °C</p>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
  )
}

const SingleCountry = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>Languages:</h2>
      <Languages languages={country.languages} />
      <Flag flag = {country.flags.png} />
      <Weather country = {country} />
    </div>
  )
}

const SingleCountryWithShow = ({country}) => {
  const [show, setShow] = useState(false)

  const handleClickShow = () => {
    setShow(!show)
  }

  return(
    <li key={country.name.coomon}>
      {country.name.common}
      <button onClick={handleClickShow}> show</button>
      {show ? <SingleCountry country = {country}/> : null}
    </li>
  )
}

const CountryName = (props) => {
  let returnedCountries = props.completeList.filter(country => country.name.common.toLowerCase().includes(props.searchFilter.toLowerCase()))

  if (props.searchFilter.length === 0){
    return (
      <div>
        <p className='note'>Type down the country that you want to learn more about!</p>
        <img src={myPhoto} className="photo" alt="World-map" />
      </div>
    )
  }

  if (returnedCountries.length > 10) {
    return (
         <p className='note'>Too many matches, specify another filter</p>
    )
  }

  if (returnedCountries.length > 1 && returnedCountries.length < 10 ) {
    return(
      <ul>
        {returnedCountries.map((country, index) => {
          return(
            <SingleCountryWithShow key = {index} country = {country} />
          )
        })}
      </ul>
    )
  }

  if (returnedCountries.length === 1){
    return(
      <SingleCountry country = {returnedCountries[0]} />
    )
  }
}

const SearchFilter = (props) => {
  return(
    <div>
        <label htmlFor="search-field" className='note'>  find countries </label>
        <input id='search-field' value={props.searchField} onChange={props.handleSearchFieldChange} />
      </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchField, setSearchField] = useState('')

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value)
  }


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <SearchFilter searchField = {searchField} handleSearchFieldChange = {handleSearchFieldChange} />
      <CountryName searchFilter = {searchField} completeList = {countries} /> 
    </div>
  )
}

export default App;