import React from "react";
import Country from "./Country";
import { debug } from "./debug";
const CountryList = ({ countries, filter, onShow }) => {
  const q = filter.trim().toLowerCase();
  const filtered = q
    ? countries.filter((c) => c.name.common.toLowerCase().includes(q))
    : [];
  debug("Countrylist", "filtered array", filtered);
  if (q === "")
    return (
      <div>
        <p></p>
        <p>Kirjoita hakuun etsiäksesi maita</p>
      </div>
    );
  if (filtered.length > 10) {
    return <p>Liikaa osumia, tarkenna hakua</p>;
  }
  if (filtered.length > 1) {
    return (
      <ul className="country-list">
        {filtered.map((c) => (
          <li key={c.cca3} className="country-item">
            <span>{c.name.common}</span>{" "}
            <button onClick={() => onShow(c)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }
  if (filtered.length === 1) {
    return <Country country={filtered[0]} />;
  }
  return <p>No matches</p>;
};

export default CountryList;
