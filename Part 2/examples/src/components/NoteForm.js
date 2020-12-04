import React, { useState } from 'react'


    const NoteForm = ({createNote}) => {

        const [newNote, setNewNote] = useState('')

        const addNote = (event) => {
            event.preventDefault()
            createNote({
              content: newNote,
              date: new Date().toISOString(),
              important: Math.random() < 0.5,
            })
            setNewNote('')
          }
      
          const handleNoteChange = (event) => {
            console.log(event.target.value)
            setNewNote(event.target.value)
          }

        return (
        <div>
            <form onSubmit={addNote}>
              <input 
              value={newNote} 
              onChange={handleNoteChange}/>
              <button type="submit">Save</button>
            </form>
        </div>
        )
    }
    
export default NoteForm