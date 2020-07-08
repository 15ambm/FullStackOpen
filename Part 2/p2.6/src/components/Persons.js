import React from "react";

const Persons = ({persons, deleteHandler}) => {
    return (
        <div>
            {persons.map(person => <li key={person.id}>
                {person.name}
                {person.number}
                <button onClick={() => deleteHandler(person.id)}>Delete</button>
                </li>)}
        </div>
    )
}

export default Persons