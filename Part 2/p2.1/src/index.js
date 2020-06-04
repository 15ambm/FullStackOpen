import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
    )
}


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
         <Part key={part.name} part={part}/>
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => part.exercises + sum, 0)
  return(
    <p><b> Number of exercises  {sum} </b></p>
  ) 
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        },
        {
          name: 'A new part',
          exercises: 2
        },
        {
          name:'Redux',
          exercises: 9
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
]

  return (
    <div>
    {courses.map(course => <Course key={course.name} course={course}/>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))