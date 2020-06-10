import React from "react";

const Persons = ({persons}) => {
    return (
        <div>
            {persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        </div>
    )
}

export default Persons