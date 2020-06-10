import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('')


  // KEY TAKEAWAY: Passing the event parameter to our handler
  const handleNewNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // Don't forget to prevent default 
  const addNewName = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
    } else {
      const tempNewName = {
        name: newName,
        id: persons.length + 1
      }
      setPersons(persons.concat(tempNewName))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <li key={person.id}>{person.name}</li>)}
    </div>
  )
}

export default App