import { useState } from 'react'

const GOOD = 1
const NEUTRAL = 0
const BAD = -1

const Button = (props) => {
  console.log("Button",props)
  return (
    <button onClick={props.onClick}>{props.label}</button>
  )
}


const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  console.log("Stats")
  const totalVotes = good + neutral + bad
  if(totalVotes==0)
    return <div>No feedback given</div>

  const avg = (good*GOOD + neutral*NEUTRAL+bad*BAD)/totalVotes
  const goodPerc = (good / totalVotes)*100
  return (
    <div>
      <table><tbody>
        <StatisticLine text="Good" value ={good} />
        <StatisticLine text="Neutral" value ={neutral} />
        <StatisticLine text="Bad" value ={bad} />      
        <StatisticLine text="Average" value ={avg} />
        <StatisticLine text="Positive" value ={goodPerc + "%"} />
        </tbody></table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const voteGood = () => {
    setGood(good+1)
  }
  const voteNeutral = () => {
    setNeutral(neutral+1)
  }
  const voteBad = () => {
    setBad(bad+1)
  }
  return (
    <div>
      <h3>Give feedback</h3>
      <Button onClick={voteGood} label="Good"/>
      <Button onClick={voteNeutral} label="Neutral"/>
      <Button onClick={voteBad} label="Bad"/>
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App