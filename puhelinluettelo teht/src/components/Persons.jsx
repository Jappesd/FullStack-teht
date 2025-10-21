const Persons = ({personsToShow}) =>{
    return (
        <ul>
            {personsToShow.map(p => (
                <p key={p.name}>
                    {p.name} {p.number}
                </p>
            ))}
        </ul>
    )
}

export default Persons