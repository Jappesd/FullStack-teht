import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const addPerson=(event)=>{
    event.preventDefault() //prevents reload on form submit
    //check if name already in persons
    if (persons.some(p => p.name === newName)){
      alert(`${newName} is already in the phonebook`)
      return
    }
    //adding the new person to 'persons'
    const newPerson = {name: newName, number: newNumber}
    setPersons(persons.concat(newPerson))//create a new array
    setNewName('')
    setNewNumber('')
  }
  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )
    

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={e => setFilter(e.target.value)}
      />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={e => setNewName(e.target.value)}
        handleNumberChange={e => setNewNumber(e.target.value)}
        addPerson={addPerson}
      
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App