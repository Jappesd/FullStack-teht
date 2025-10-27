const Persons = ({personsToShow, handleDelete}) =>{
    return (
        <ul>
            {personsToShow.map(p => (
                <li key={p.id}>
                    {p.name} {p.number}
                    <button onClick={() => handleDelete(p.id)}
                    style={{marginLeft: '20px'}} >
                        delete
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Persons