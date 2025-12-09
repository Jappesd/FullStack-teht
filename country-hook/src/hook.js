import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );
        setCountry(response.data || null);
      } catch (err) {
        setCountry(null);
        setError("Country not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  return { country, loading, error };
};
