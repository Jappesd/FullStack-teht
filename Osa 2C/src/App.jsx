import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {
  const [showAll, setShowAll] = useState(true)
  const [notes, setNotes]=useState([])
  const [newNote, setNewNote] = useState('a new note...')
  
  useEffect(() => {
    console.log('effect')
    axios
        .get('http://localhost:3001/notes')
        .then(r => {
            console.log('promise fulfilled')
            setNotes(r.data)
        })
  }, [])
  console.log('render', notes.length, 'notes')
  
  
  const addNote = (event) =>{
    event.preventDefault()
    const noteObject ={
      content:newNote,
      important:Math.random()>0.5,
      id:String(notes.length +1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  const handleNoteChange =(event) => {
    
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? notes : notes.filter(note=>note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note key={note.id} note={note}/>
        )}
      </ul>

        <form onSubmit={addNote}>
          <input value={newNote}
          onChange={handleNoteChange}/>
          <button type='Submit'>Save</button>
        </form>


    </div>
  )

}

export default App