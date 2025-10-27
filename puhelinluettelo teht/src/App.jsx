import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import comms from './services/comms'


const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    comms.getAll()
      .then(r => {
        console.log('fetched persons', r)
        setPersons(r)
      })
  },[])
   

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  


  const addPerson=(event)=>{
    event.preventDefault() //prevents reload on form submit
    //check if name already in persons
    console.log('exisisting persons when adding:', persons)
    if (!newName.trim()) return

    const existingPerson = (persons.find(p => p.name === newName))
    if (existingPerson){
      if (window.confirm(`${newName} is already added to phonebook, replace number?`)){
        const changedPerson= {...existingPerson, number: newNumber}
        
        comms.update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      if (persons.some(p => p.name.toLowerCase() === newName.toLowerCase())) return
      const personObject = {name: newName, number: newNumber}
      comms.create(personObject).then(response => {
        console.log("returned person:",response)
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    }
   
  }
  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )
    
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return
    if (window.confirm(`Delete ${person.name}?`)){
      comms.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`Information of ${person.name} has already been deleted`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )

}

export default App