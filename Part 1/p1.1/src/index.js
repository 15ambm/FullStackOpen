import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {

  return (
    <h1> 
      <p>{props.course}</p>
    </h1>
  )

}

const Part = (props) => {

  return (
    <div> 
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {

  let parts = props.parts
  let exercises = props.exercises

  return (
    <div> 
      <Part part={parts[0]} exercise={exercises[0]}/>
      <Part part={parts[1]} exercise={exercises[1]}/>
      <Part part={parts[2]} exercise={exercises[2]}/>
    </div>
  )

}

const Total = (props) => {

  let list = props.exercises
  let sum = 0

  for (let i = 0; i < list.length; i++) {
    sum += list[i]
  }

  return (
    <div> 
      <p>Number of exercises {sum} </p>
    </div>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content  parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))