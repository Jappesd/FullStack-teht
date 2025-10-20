import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addPerson=(event)=>{
    console.log(event.target.value)
    const huima=[...persons]
    huima.push({name: event.target.value})
    console.log(huima)
    setPersons(huima)
    
  }
  const Persons = () =>{
    return (
      <div>
        
       </div>
    )
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={e=>setNewName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(n=> <p key={n.name}>{n.name}</p>)}
    </div>
  )

}

export default App