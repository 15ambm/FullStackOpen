import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas', number: "39-54", id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523',id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345',id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, toggleShowAll] = useState(true)
  const [ filter, setFilter] = useState('')
  

  // KEY TAKEAWAY: Passing the event parameter to our handler
  const handleNewNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if(event.target.value === '') {
      toggleShowAll(true)
    } else {
      toggleShowAll(false)
    }

  }

  // Don't forget to prevent default 
  const addNewPerson = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
    } else {
      const tempNewName = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(tempNewName))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = showAll ? persons : persons.filter(persons => {
    let lowerCaseName = persons.name.toLocaleLowerCase()
    let lowerCaseFilter = filter.toLocaleLowerCase()
    return lowerCaseName.includes(lowerCaseFilter)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <input value={filter} onChange={handleFilterChange}></input>
      </div>
      <h2>Add New Number</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
    </div>
  )
}

export default App