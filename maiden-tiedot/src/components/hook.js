import axios from "axios";
import { useEffect, useState } from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(res.data[0]);
      } catch (error) {
        setCountry(null);
      }
    };
    fetchCountry();
  }, [name]);

  return country;
};
