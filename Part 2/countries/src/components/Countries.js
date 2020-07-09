import React, { useState } from 'react';
import Country from "./Country";

const Countries = ({data, handleShowButton}) => {

    if (data.length > 10) return (<div> Too Many Results </div>)
    else if (data.length > 1) {
      return (
        <div>
            {data.map(item => {
                if(item.expanded === false) {
                    return (
                        <li key={item.data.numericCode}>
                            {item.data.name} 
                            <button onClick={ () => handleShowButton(true, item.data.numericCode) }> Show</button> 
                        </li>
                    ) 
                } else {
                    return (
                        <li key={item.data.numericCode}>
                            <Country data={item.data} handleShowButton={handleShowButton} single={false}/>
                        </li>    
                    )
                }
            }  
          )}
        </div>
      )
    } else if (data.length === 1) {
      let country = data[0].data
      return (
        <Country data={country} handleShowButton={handleShowButton} single={true}/>
      )
    } else return (<div>No Results</div>)
  }
  
    
export default Countries