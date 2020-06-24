import React from 'react';
import Country from "./Country";

const Countries = ({data}) => {
    
    if (data.length > 10) return (<div> Too Many Results </div>)
    else if (data.length > 1) {
      return (
        <div>
          {data.map(item => <li key={item.numericCode}>{item.name}</li> )}
        </div>
      )
    } else if (data.length === 1) {
      let country = data[0]
      return (
        <Country data={country}/>
      )
    } else return (<div>No Results</div>)
  }
  
    
export default Countries