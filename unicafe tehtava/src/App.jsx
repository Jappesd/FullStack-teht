import { useState } from "react"
const Button = ({onClick, text}) =>
  <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  if (props.total ===0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.total}/>
      <StatisticLine text='average' value={props.average}/>
      <StatisticLine text='positive' value={props.positive}/>
        </tbody>
      

      </table>
    </div>
  )
}

const StatisticLine = ({text,value}) => <tr><td>{text} {value}</td></tr>


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = bad+neutral+good
  const positive = ((100*good)/total)+'%'
  const average=((good-bad)/total)
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={() =>setGood(good + 1)} text='Good'/>
        <Button onClick={()=>setNeutral(neutral + 1)} text='Neutral'/>
        <Button onClick={() =>setBad(bad + 1)} text='Bad'/>
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} 
      neutral={neutral} total={total} average={average}
      positive={positive} />
    </div>
  )

}
export default App