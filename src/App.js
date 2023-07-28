import { useEffect, useState } from 'react'
import axios from 'axios'

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
    <img src={flag} />
  )
}

const SingleCountry = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>Languages:</h2>
      <Languages languages={country.languages} />
      <Flag flag = {country.flags.png} />
    </div>
  )
}

const CountryName = (props) => {
  let returnedCountries = props.completeList.filter(country => country.name.common.toLowerCase().includes(props.searchFilter.toLowerCase()))

  if (props.searchFilter.length == 0){
    return (
      <p>Type down the country that you want to learn more about!</p>
    )
  }

  if (returnedCountries.length > 10) {
    return (
         <p>Too many matches, specify another filter</p>
    )
  }

  if (returnedCountries.length > 1 && returnedCountries.length < 10 ) {
    return(
      <ul>
        {returnedCountries.map(country => {
          return(
            <li key={country.name.common}>
              <p>{country.name.common}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  if (returnedCountries.length == 1){
    return(
      <SingleCountry country = {returnedCountries[0]} />
    )
  }
}

const SearchFilter = (props) => {
  return(
    <div>
        <label htmlFor="search-field">  find countries </label>
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
  }, [])

  return (
    <div>
      <SearchFilter searchField = {searchField} handleSearchFieldChange = {handleSearchFieldChange} />
      <CountryName searchFilter = {searchField} completeList = {countries} /> 
    </div>
  )

}

export default App;