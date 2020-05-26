import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  console.log("Header Props: ", props)
  return (
    <h1> 
      <p>{props.course.name}</p>
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
  console.log("Content Props: ", props)

  let parts = props.course.parts

  return (
    <div> 
      <Part part={parts[0].name} exercise={parts[0].exercises}/>
      <Part part={parts[1].name} exercise={parts[1].exercises}/>
      <Part part={parts[2].name} exercise={parts[2].exercises}/>
    </div>
  )

}

const Total = (props) => {
  console.log("Total Props: ", props)
  let parts = props.course.parts
  let sum = 0

  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises
  }

  return (
    <div> 
      <p>Number of exercises {sum} </p>
    </div>
  )

}

const Display = ({counter}) => <div> {counter} </div>


const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
 )

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name:   'Fundamentals of React',
          exercises: 10
        },
        {
          name:   'Using props to pass data',
          exercises: 7
        },  
        {
          name:   'State of a component',
          exercises: 14
        }
      ]
    }

    const [ counter, setCounter ] = useState(0)
    
    const incrementCounter = () => setCounter(counter + 1)
    const zeroCounter = () => setCounter(0)
    const decrementCounter = () => setCounter(counter - 1)

  return (
    <div>
      {/* <Header course={course}/>
      <Content  course={course} />
      <Total course={course} /> */}

    <Display counter={counter}/>

    <Button handleClick={incrementCounter} text="Add One"/>
    <Button handleClick={zeroCounter} text="Zero"/>
    <Button handleClick={decrementCounter} text="Subtract One"/>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))