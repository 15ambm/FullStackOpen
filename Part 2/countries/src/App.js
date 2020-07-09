import React, { useState, useEffect } from 'react';
import axios from "axios";
import Countries from "./components/Countries";

const App =  () => {

  const [textInput, setInput] = useState("")
  const [countryData, setCountryData] = useState([])
  const [expandedCountries, setExpandedCountries] = useState([])

  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      //console.log(response.data)
      setCountryData(response.data)
    })

  }, [])

  const onInputChange = (event) => {
    setInput(event.target.value)
    setExpandedCountries([])
  }

  const filteredData = countryData.reduce((prev, item) => {
    let lowerCaseInput = textInput.toLocaleLowerCase()
    let lowerCaseData = item.name.toLocaleLowerCase()
    if(lowerCaseData.indexOf(lowerCaseInput) >= 0) {
      if (expandedCountries.includes(item.numericCode)){
        prev.push({data:item, expanded:true})
        return prev
      } else {
        prev.push({data:item, expanded:false})
        return prev
      }

    }
    return prev
  }, [])

  const handleShowButton = (toggle, code) => {
      if(toggle) {
        let replace = expandedCountries.concat(code)
        setExpandedCountries(replace)
      } else {
        let replace = expandedCountries.filter(item => {
          if (item === code) {
            return false
          } else return true
        })
        setExpandedCountries(replace)
      }
  }
  
  return (
    <div>
      <h2>Find Countries</h2>
      <form>
        <input value={textInput} onChange={onInputChange}/>
      </form>
        <Countries data={filteredData} handleShowButton={handleShowButton}/>
    </div>
  );
}

export default App;
