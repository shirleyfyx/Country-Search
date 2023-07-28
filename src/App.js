import { useEffect, useState } from 'react'
import axios from 'axios'


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
      <div>
        {returnedCountries.map(country => {
          return(
            <li>
              <p>{country.name.common}</p>
            </li>
          )
        })}
      </div>
    )
  }
}

const SearchFilter = (props) => {
  return(
    <div>
        <label htmlFor="search-field">find countries</label>
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