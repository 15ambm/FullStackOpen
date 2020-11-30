import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm";
import Persons from './components/Persons';
import Filter from './components/Filter';
import service from './services/persons'

const Notification = ({message}) => {
  if(message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, toggleShowAll] = useState(true)
  const [ filter, setFilter] = useState('')
  const [ notification, setNotification] = useState(null)

  useEffect(() => {
    service
      .getAll()
      .then(initialData => {
        console.log(initialData)
        setPersons(initialData)
        const ids = initialData.map(item => item.id)
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
    const existingPerson = persons.find(person => person.name === newName)

    if(existingPerson) {
      const result = window.confirm(`${newName} is already in the phonebook, would you like to replace the old number with a new one?`)
      if(result) {
        const id = existingPerson.id
        const changedPerson = {...existingPerson, number: newNumber}
        const updatedPersons = persons.map(p => p.id !== id ? p : changedPerson)

        service
          .update(id, changedPerson)
          .then(response => {
              setNotification(`The number of '${changedPerson.name}' has been changed`)
              setPersons(updatedPersons)
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
                  setNotification(null)
              }, 5000)
          })
      }
    } else {
      const tempNewName = {
        name: newName,  
        number: newNumber,
        // id: rollingID
      }
      service
        .create(tempNewName)
        .then(response => {
          console.log(response)
          setNotification(`'${newName}' has been added to the Phonebook`)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          // setRollingID(rollingID + 1)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(err => {
          //console.log(err.response)
          setNotification(`Unable to add a new person: ${err.response.data.error}`)
          setTimeout(() => {
            setNotification(null)
        }, 5000)
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
        setNotification(`'${person.name}' has been deleted from the Phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification(`'${person.name}' has been deleted from the Phonebook`)
        setPersons(persons.filter(p => p.id !== person.id))
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        console.log("the person has been removed from the server already")
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
      <Notification message={notification}/>
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