import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import Country from "./components/Country";
import { debug } from "./components/debug";
const App = () => {
  const [maat, setMaat] = useState([]);
  const [haku, setHaku] = useState("");
  const [valittuMaa, setValittuMaa] = useState(null);
  const handleShow = (country) => {
    console.log("handleShow clicked", country);
    setValittuMaa((prev) =>
      prev && prev.name.common === country.name.common ? null : country
    );
  };
  const urli = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios
      .get(urli)
      .then((response) => {
        setMaat(response.data), debug("response.data", "data", response.data);
      })
      .catch((error) => console.error("Failed to load", error));
  }, []);
  return (
    <div className="container">
      <h1>Maiden Haku</h1>
      <div className="filter">
        <Filter
          value={haku}
          onChange={(e) => {
            setHaku(e.target.value);
            setValittuMaa(null);
          }}
        />
      </div>
      <CountryList countries={maat} filter={haku} onShow={handleShow} />
      {valittuMaa && <Country country={valittuMaa} />}
    </div>
  );
};

export default App;
