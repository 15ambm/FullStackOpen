import React, { useState, useEffect } from 'react'
import Note from "./components/Note";
import axios from 'axios';
import noteService from "./services/notes";

const App = (props) => {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
  
    useEffect(() => {
      noteService
        .getAll()
        .then(initialResponse => {
          setNotes(initialResponse)
        })
        .catch(error => {
          alert(`there has been a problem`)
        })
    }, [])


    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
        id: notes.length + 1
      }

      noteService
        .create(noteObject)
        .then(response =>{
           setNotes(notes.concat(response))
           setNewNote('')
          })
    }

    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }
    
    const toggleNoteImportance = (id) => {
      console.log("toggle id ", id)
      
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = {...note, important: !note.important}

      noteService
        .update(id, changedNote)
        .then(response => {
          console.log(response)
          setNotes(notes.map(note => note.id !== id ? note : response))
        })
        .catch(error => {
          alert(`there has been a problem`)
          setNotes(notes.filter(n => id !== n.id))
        })


    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? "important" : "all"}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={() => toggleNoteImportance(note.id)}/>
            )}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }

  export default App