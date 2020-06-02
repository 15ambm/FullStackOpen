import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'NICE'
]


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const submitVote = () =>{
      let copy = [...votes]
      copy[selected]+=1
      setVotes(copy)
  }

  return (
    <div>

      <h2>Anecdote of the Day</h2>
      {props.anecdotes[selected]}
      <div>Has {votes[selected]} votes</div>
      <div>
        <button onClick={randomAnecdote}>Next Anecdote</button>
        <button onClick={submitVote}>Vote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
      <div>Has {Math.max(...votes)} </div>
  
    </div>
  )




}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)