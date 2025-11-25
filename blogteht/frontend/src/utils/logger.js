const getTimestamp = () => {
  return new Date().toLocaleString("fi-FI", {
    hour12: false,
    timeZone: "Europe/Helsinki",
  });
};

const info = (...params) => {
  console.log(`\x1b[32m[INFO]\x1b[0m  ${getTimestamp()}  |`, ...params);
};

const error = (...params) => {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${getTimestamp()}  |`, ...params);
};

const logger = {
  info: (...p) => {
    info(...p);
  },
  error: (...p) => {
    error(...p);
  },
};

export default logger;
