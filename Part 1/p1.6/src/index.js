import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const Statistic = ({text, value}) => {
  return (
  <div> {text} {value} </div>
  )
}

const Statistics = ({stats}) => {
  console.log(stats)

  if (stats.good == 0 && stats.neutral == 0 && stats.bad == 0){
    return (
      <div>No Feedback Given</div>
    )
  }

  return (
    <div>
      <Statistic text="good" value={stats.good}/>
      <Statistic text="neutral" value={stats.neutral}/>
      <Statistic text="bad" value={stats.bad}/>
      <Statistic text="total" value={stats.total}/>
      <Statistic text="average" value={stats.average}/>
      <Statistic text="positive" value={stats.positive}/>
    </div>
  )
}

const Button = ({handleClick, text}) => {

  return (
  <button onClick={handleClick}>{text}</button>
  )

}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad
  let average = (good - bad) / total
  let positive = (good / total)*100

  let stats = {
    good,
    neutral,
    bad,
    total,
    average,
    positive
  }

  return (
    <div> 

      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <h3>Statistics</h3>
      <Statistics stats={stats}/>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

