import React from "react";

const Filter = ({filter, onChange}) => {
    return (
        <div>
        <input value={filter} onChange={onChange}></input>
      </div>
    )
}

export default Filter