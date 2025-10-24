import { useEffect, useState } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const App = (props) => {
  const [showAll, setShowAll] = useState(true)
  const [notes, setNotes]=useState([])
  const [newNote, setNewNote] = useState('')
  
    useEffect(() => {
      noteService
        .getAll()
        .then(response => {
          setNotes(response.data)
        })
    },[])
    
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    
    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response.data))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted`)
      })

    }
  const addNote = (event) =>{
    event.preventDefault()
    const noteObject ={
      content:newNote,
      important:Math.random()>0.5,
      
    }
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
    


    
  }



  const handleNoteChange =(event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? notes : notes.filter(note=>note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => {console.log('Toggling showAll to:', !showAll); setShowAll(!showAll)}}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
        />
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
