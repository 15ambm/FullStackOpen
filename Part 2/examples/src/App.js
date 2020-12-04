import React, { useState, useEffect, useRef } from 'react'
import Note from "./components/Note";
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from "./services/notes";
import loginService from './services/login'
import Togglable from './components/Togglable';

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return <div style={footerStyle}>
    <br/>
    <em>Note App, Made by Alex Mason 2020</em>
  </div>
}

const App = (props) => {

    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    const noteFormRef = useRef()
  
    useEffect(() => {
      noteService
        .getAll()
        .then(initialResponse => {
          setNotes(initialResponse)
        })
        .catch(error => {
          alert(`there has been a problem getting notes from the server`)
        })
    }, [])

    useEffect(() => {
      const loggedNoteUser = window.localStorage.getItem('loggedNoteUser')
      if(loggedNoteUser) {
        const user = JSON.parse(loggedNoteUser)
        setUser(user)
        noteService.setToken(user.token)
      }
    }, [])
    
    const toggleNoteImportance = (id) => {
      console.log("toggle id ", id)
      
      const note = notes.find(n => n.id === id)
      const changedNote = {...note, important: !note.important}

      noteService
        .update(id, changedNote)
        .then(response => {
          console.log(response)
          setNotes(notes.map(note => note.id !== id ? note : response))
        })
        .catch(error => {
          setErrorMessage(`The note '${note.content}' was already removed`)
          setTimeout(() =>{
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => id !== n.id))
        })


    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username, password
        })

        window.localStorage.setItem(
          'loggedNoteUser', JSON.stringify(user)
        )
        noteService.setToken(user.token)
        setUser(user)
        setPassword('')
        setUsername('')
      } catch (e) {
        setErrorMessage('Invalid Login Information')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

    }

    const addNote = (noteObject) => {
      noteFormRef.current.toggleVisibility()
      noteService
        .create(noteObject)
        .then(response => setNotes(notes.concat(response)))
    }

    const loginForm = () => {
      const hideWhenVisible = { display: loginVisible ? 'none' : '' }
      const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage}/>

        {user === null ?
          loginForm():
          <div>
            <p>{user.name} logged-in</p>
            <Togglable buttonLabel="New Note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
          
        }

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
        
        <Footer/>
      </div>
    )
  }

  export default App