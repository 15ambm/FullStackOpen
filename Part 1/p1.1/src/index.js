import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {

  return (
    <h1> 
      <p>{props.course}</p>
    </h1>
  )

}


const Content = (props) => {

  return (
    <div> 
      <p>{props.part} {props.exercise}</p>
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
      <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))