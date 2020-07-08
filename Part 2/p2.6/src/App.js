import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm";
import Persons from './components/Persons';
import Filter from './components/Filter';
import service from './services/persons'

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, toggleShowAll] = useState(true)
  const [ filter, setFilter] = useState('')
  const [ rollingID, setRollingID] = useState(0)

  useEffect(() => {
    service
      .getAll()
      .then(initialData => {
        console.log(initialData)
        setPersons(initialData)
        const ids = initialData.map(item => item.id)
        setRollingID(Math.max(...ids) + 1)
      })
  }, [])


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
        id: rollingID
      }
      service
        .create(tempNewName)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setRollingID(rollingID + 1)
        })
    }
  }

  const deletePersonHandler = (id) => {
    const person = persons.find(p => p.id === id)
    const result = window.confirm(`Are you sure you would like to delete ${person.name}`)
    if(result) {
      service
      .deleteItem(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
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
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add New Number</h3>
        <PersonForm 
          newName={newName} 
          nameHandler={handleNewNameChange}
          newNumber={newNumber} 
          numberHandler={handleNewNumberChange}
          buttonHandler={addNewPerson}
          />
      <h3>Numbers</h3>
        <Persons persons={personsToShow} deleteHandler={deletePersonHandler}/>
    </div>
  )
}

export default App