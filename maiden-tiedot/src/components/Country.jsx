import React from "react";
import CountryList from "./CountryList";
import { debug } from "./debug";
const Country = (props) => {
  const country = props.country;
  debug("Country", "prop", country);
  if (!country) return null;

  const languages = country.languages ? Object.values(country.languages) : [];
  const capital = Array.isArray(country.capital)
    ? country.capital.join(", ")
    : country.capital;
  return (
    <div className="country-details">
      <h2>{country?.name?.common ?? "Loading..."}</h2>
      <p>Capital {capital}</p>
      <p>Area {country?.area}</p>

      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        className="flag"
        src={country?.flags && country?.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
      <div className="weather">{/*weather info here */}</div>
    </div>
  );
};

export default Country;
