
const Note = ({note,toggleImportance}) => {
  const label = note.important ? 'make not important' : 'make important'
  
  return (
    <li style={{alignItems:'center',gap:'20px'}}>
      {note.content}
      <button style={{marginLeft:'20px'}} onClick={toggleImportance}>{label}</button>
    </li>
  )
}
export default Note