import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import comms from "./services/comms";
import Notification from "./components/Notification";
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
  const [successMsg, setSuccessMsg] = useState(null);
  const addPerson = (event) => {
    event.preventDefault(); // prevent page reload

    if (!newName.trim()) return; // ignore empty names

    // check if name exists (case-insensitive)
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      // ask for confirmation to update
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace number?`
      );
      if (!confirmUpdate) return;

      // create updated object with new number
      const changedPerson = { number: newNumber, name: existingPerson.name };

      // send PUT request using _id for backend
      comms
        .update(existingPerson.id, changedPerson)
        .then((returnedPerson) => {
          // normalize returned person: add id for frontend
          const updatedPerson = { ...returnedPerson, id: returnedPerson.id };

          // update state
          setPersons(
            persons.map((p) => (p.id !== existingPerson.id ? p : updatedPerson))
          );

          // success message
          setSuccessMsg(`Changed number for ${existingPerson.name}`);
          setTimeout(() => setSuccessMsg(null), 3000);

          // reset inputs
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          const msg = error.response?.data?.error ?? error.message;
          console.error(msg);
          setErrorMsg(msg);
          setTimeout(() => setErrorMsg(null), 4000);
        });
    } else {
      // create new person object
      const personObject = { name: newName, number: newNumber };

      comms
        .create(personObject)
        .then((response) => {
          // normalize returned person: add id for frontend
          const newPerson = { ...response, id: response.id };

          // update state
          setPersons(persons.concat(newPerson));

          // success message
          setSuccessMsg(`Added ${response.name} to phonebook`);
          setTimeout(() => setSuccessMsg(null), 5000);

          // reset inputs
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          const msg = error.response?.data?.error ?? error.message;
          console.error(msg);
          setErrorMsg(msg);
          setTimeout(() => setErrorMsg(null), 4000);
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
          setSuccessMsg(`Deleted ${toDelete} from phonebook`);
          setTimeout(() => {
            setSuccessMsg(null);
          }, 4000);
        })
        .catch((error) => {
          alert(`Information of ${person.name} has already been deleted`);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };
  // console.log(personsToShow);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMsg} type="error" />
      <Notification message={successMsg} type="success" />
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
