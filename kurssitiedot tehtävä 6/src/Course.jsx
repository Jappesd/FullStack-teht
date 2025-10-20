  const Course = ({course1,course2}) => {
    const alku1=course1.name
    const alku2=course2.name
    const parts1=[...course1.parts]
    const parts2=[...course2.parts]
    const total1= parts1.reduce((total,part) =>{
      return total+part.exercises
    },0)
    const total2=parts2.reduce((total,part)=>{
      return total+part.exercises
    },0)
    return (
      <div>
      <h1>{alku1}</h1>
        {parts1.map(joku => <p key={joku.id}>{joku.name} {joku.exercises}</p>)}
        <p1>Total of {total1} exercises</p1>
      <h1>{alku2}</h1>
        {parts2.map(joku=><p key={joku.id}>{joku.name} {joku.exercises}</p>)}
        <p1>Total of {total2} exercises</p1>
      </div>
    )


  }
export default Course