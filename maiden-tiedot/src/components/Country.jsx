import React, { useEffect, useState } from "react";
import CountryList from "./CountryList";
import { debug } from "./debug";
import getWeather from "./weather.jsx";
const Country = (props) => {
  const [weather, setWeather] = useState(null);
  const country = props.country;
  useEffect(() => {
    console.log(weather);
  }, [weather]);
  debug("Country", "prop", country);
  if (!country) return null;
  useEffect(() => {
    if (!country) return;
    debug("fetching mockdata for weather", country.name.common);
    getWeather(country.name.common).then((response) => {
      debug("mock weatherdata", response), setWeather(response);
    });
  }, [country]);
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
      {weather ? (
        <div>
          <p>🌡️ Temperature: {weather.temperature}°C</p>
          <p>💨 Wind: {weather.wind} m/s </p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Country;
