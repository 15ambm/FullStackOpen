import React from 'react';

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
  

  export default Course