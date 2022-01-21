import React, { useState ,useEffect, useRef} from 'react'
// import { useEffect } from 'react'
// import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import SearchIcon from '@mui/icons-material/Search'
import Country from './Country'
import CountryDetails from './CountryDetails'
import { Route, Routes } from 'react-router-dom'
import './App.css'

//Libraries Used 
//React Router - https://reactrouter.com/
// MUI - https://mui.com/

// used Routes in place of Switch as version 6 of react-router-dom comes with Routes not Switch
// Switch has been replaced with Routes
// npm i react-router-dom@6
//
const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [countries, setCountries] = useState([])
  const countriesInputRef = useRef()
  const regionRef = useRef()
  const noCountries = countries.status || countries.message; 
  const navigate = useNavigate()

  //Turns To darkMode // this is function for 
  const switchMode = () => {
    setDarkMode((prevState) => !prevState)
  }
  // the data or flags will render once and will not call the server again and again 
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error)
    }
  },[])

  //fetches data from the API https://restcountries.com/v2/all

  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v2/all')
    const data = await response.json();
    
//status check from Api
    if(data.status===404){
      setCountries([])
      return;
    }
    setCountries(data);
  }
 
// console.log(countries)
/// search by country name, in the input box using the fetch(){ method}


const searchCountries=()=>{
  // countriesInputref = useRef()
  const searchValue = countriesInputRef.current.value
  if(searchValue.trim())
  {
    const fetchSearch = async ()=>  {
      const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`)
      const data = await response.json()
      //trimmeddata set
      setCountries(data)
    }
    try{
      fetchSearch();
    }
    catch(error){
      console.log(error);
    }

  }
  else{
    fetchData()
  }
}




//select tag dropdown code according to region, we are setting the data 
const selectRegion = ()=>{
  const selectValue = regionRef.current.value
  if(selectValue.trim())
  {
    const fetchSelect = async () =>{
      const response = await fetch(`https://restcountries.com/v2/region/${selectValue}`)
      const data = await response.json();
      if(selectValue ==='All'){
        try{
          fetchData()
          //true will render the full data ie..flags and details 
        }
        catch(error){
          console.log(error);
        }
        return;
      }
      setCountries(data)

    }
    try{
      fetchSelect()

    }catch(error){
      console.log(error);
    }
  }
}




//usenavigate hook 
const showDetails = (code)=>{
  navigate(`/${code}`)

}

//Below written are objects names from the ApI
//key={country.alpha3Code}
// code={country.alpha3Code}
// name={country.name}
// capital={country.capital}
// population={country.population}
// region={country.region}
// flag={country.flag}
  return (
    <div className={`app ${darkMode ? 'darkMode' : ''}`}>
      <Header onClick={switchMode} darkMode={darkMode} />
      <Routes>
        <Route
          path="/"
          // element is used react-router-dom version 6
          element={
            <div className="app_body">
              <div className="inputs">
                <div className={`search_input ${darkMode ? 'darkMode' : ''}`}>
                  
                  <SearchIcon />
                  <input type="text" placeholder="Search For a Country..."  ref={countriesInputRef}  onChange={searchCountries}/>
                </div>
                <div className={`select_region ${darkMode ? 'darkMode' : ''}`}>
                  <select ref={regionRef} onChange={selectRegion}>
                    <option>All</option>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
              <div className="countries">

                {!noCountries ?(countries.map(country => (
                  <Country darkMode={darkMode} 
                  key={country.alpha3Code}
                  code={country.alpha3Code}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  region={country.region}
                  flag={country.flag}
                  showDetails={showDetails}
                
                  />
                ))) : (<p>
                  No countries Found
                </p>) }
              </div>
            </div>
          }
        />
        <Route
          path="/:countryCode"
          element={<CountryDetails darkMode={darkMode} countries={countries} refetch={fetchData}/>}
        />
      </Routes>
    </div>
  )
}

export default App