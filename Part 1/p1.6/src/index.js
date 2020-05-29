import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad
  let average = (good - bad) / total
  let positive = (good / total)*100

  return (
    <div> 

      <h2>Give Feedback</h2>
      <button onClick={() => setGood(good + 1)}>  good </button>
      <button onClick={() => setNeutral(neutral + 1)}>  neutral </button>
      <button onClick={() => setBad(bad + 1)}>  bad </button>

      <h3>Statistics</h3>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

