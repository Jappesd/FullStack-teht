import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCountry } from "./hook";
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const Country = ({ country }) => {
  if (!country) return <div>not found...</div>;

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital: {country.capital?.[0]}</div>
      <div>population: {country.population}</div>
      <div>flag: {country.flag}</div> {/* emoji */}
      <img
        src={country.flags?.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { country, loading, error } = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} loading={loading} error={error} />
    </div>
  );
};

export default App;
