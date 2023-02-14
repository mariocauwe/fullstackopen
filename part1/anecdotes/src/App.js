import { useState } from 'react'

const Anecdote = ({anecdote, votes}) => {
  return(
    <div>{anecdote} <br/> has {votes} votes.</div> 
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState( Array(anecdotes.length).fill(0))
  const [mostPopular, setMostPopular] = useState(0)

  const selectAnec = () => {
    console.log("select anecdote")
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const vote = () => {
    console.log("vote for ", {selected})
    const newVotes = [...votes]
    newVotes[selected] += 1
    if( newVotes[selected] >= votes[mostPopular] ) {
      console.log("new most popular", selected, mostPopular)
      setMostPopular(selected)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={vote}>vote</button>
      <button onClick={selectAnec}>next anecdote</button>
      <h3>Anecdote with most votes</h3>
      <Anecdote anecdote={anecdotes[mostPopular]} votes={votes[mostPopular]} />
    </div>
  )
}

export default App