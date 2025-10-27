import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import comms from "./services/comms";
import MsgNotification from "./components/MsgNotification";
import ErrorMessage from "./components/ErrorMsg";
const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    comms.getAll().then((r) => {
      console.log("fetched persons", r);
      setPersons(r);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [erroriMsg, setErroriMsg] = useState(null);
  const addPerson = (event) => {
    event.preventDefault(); //prevents reload on form submit
    //check if name already in persons
    console.log("exisisting persons when adding:", persons);
    if (!newName.trim()) return;

    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace number?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber };

        comms
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
            setErrorMsg(`Changed number for ${existingPerson.name}`);
            setTimeout(() => {
              setErrorMsg(null);
            }, 3000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
            setErroriMsg(
              `Information of '${existingPerson.name}' has already been removed from server`
            );
            setTimeout(() => {
              setErroriMsg(null);
            }, 4000);
          });
      }
    } else {
      if (persons.some((p) => p.name.toLowerCase() === newName.toLowerCase()))
        return;
      const personObject = { name: newName, number: newNumber };
      comms.create(personObject).then((response) => {
        console.log("returned person:", response);
        setPersons(persons.concat(response));
        setErrorMsg(`Added ${response.name} to phonebook`);
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) return;
    if (window.confirm(`Delete ${person.name}?`)) {
      let toDelete = person.name;
      comms
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setErroriMsg(`Deleted ${toDelete} from phonebook`);
          setTimeout(() => {
            setErroriMsg(null);
          }, 4000);
        })
        .catch((error) => {
          alert(`Information of ${person.name} has already been deleted`);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <MsgNotification message={errorMsg} />
      <ErrorMessage messaged={erroriMsg} />
      <Filter
        filter={filter}
        handleFilterChange={(e) => setFilter(e.target.value)}
      />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
