import React from "react";

const PersonForm = ({newName, newNumber, buttonHandler, nameHandler, numberHandler}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={nameHandler}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={numberHandler}/>
            </div>
            <div>
                <button type="submit" onClick={buttonHandler}>add</button>
            </div>
        </form>
        )
}

export default PersonForm