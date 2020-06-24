import React from 'react';

const Country = ({data}) => {
    return (
      <div>
        <h3>{data.name}</h3>
        <div>Capital: {data.capital}</div>
        <div>Population: {data.population}</div>
        <h4>Languages</h4>
        <div>
         {data.languages.map(item => <li key={item.iso639_1}>{item.name}</li>)}
        </div>
        <h4>Flag</h4>
        <img src={data.flag} height={90}></img>
      </div>
    )
  }
  
export default Country