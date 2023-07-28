import { useEffect, useState } from 'react'
import axios from 'axios'


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
      <p>search countries:</p> <input value={searchField} onChange={handleSearchFieldChange}></input>
    </div>
  )

}

export default App;