const mockWeatherData = {
  Finland: {
    temperature: 12,
    wind: 5,
    icon: "☁️",
  },
  Sweden: {
    temperature: 10,
    wind: 4,
    icon: "🌧️",
  },
  France: {
    temperature: 18,
    wind: 3,
    icon: "☀️",
  },
  Japan: {
    temperature: 22,
    wind: 6,
    icon: "🌤️",
  },
};

const getWeather = (countryName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockWeatherData[countryName] || {
          temperature: 20,
          wind: 2,
          icon: "🌤️",
        }
      );
    }, 800);
  });
};

export default { getWeather };
