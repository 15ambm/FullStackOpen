import React from 'react';

const Country = ({data, handleShowButton, single}) => {
    return (
      <div>
        <h3>{data.name} 
            {single ? <div></div>: <button onClick={ () => handleShowButton(false, data.numericCode) }>Collapse</button>}  
        </h3>
        <div>Capital: {data.capital}</div>
        <div>Population: {data.population}</div>
        <h4>Languages</h4>
        <div>
         {data.languages.map(item => <li key={item.iso639_1}>{item.name}</li>)}
        </div>
        <h4>Flag</h4>
        <img src={data.flag} height={90}></img>
        <div>-----------------------------------</div>
      </div>
    )
  }
  
export default Country