import React, { useState, useEffect } from 'react';
import axios from "axios";
import Countries from "./components/Countries";

const App =  () => {

  const [textInput, setInput] = useState('')
  const [countryData, setCountryData] = useState([])

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
  }

  const filteredData = countryData.filter(item => {

    let lowerCaseInput = textInput.toLocaleLowerCase()
    let lowerCaseData = item.name.toLocaleLowerCase()

    if(lowerCaseData.indexOf(lowerCaseInput) >= 0) {

      return true
    }
    else return false
  })

  //console.log("filtered: ", filteredData)
  
  return (
    <div>
      <h2>Find Countries</h2>
      <form>
        <input value={textInput} onChange={onInputChange}/>
      </form>
        <Countries data={filteredData}/>
    </div>
  );
}

export default App;
