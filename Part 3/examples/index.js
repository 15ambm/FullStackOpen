const express = require('express')
const { response } = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

  
const generateID = () => {
    const maxID = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
    return maxID + 1
}


app.post('/api/notes', (req, res) => {
    const body = req.body
    
    console.log(body.content)
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateID()
    }

    notes = notes.concat(note)
    res.json(note)
})

app.get('/', (req, res) => {
    res.send(
        '<h1>Hello World</h1>'
    )
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(item => item.id !== id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id === id)
    res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const object = req.body
    const updatedNotes = notes.map(item => item.id === id ? object : item)
    notes = updatedNotes
    res.json(object)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
