const DEBUG_MODE = false;

export function debug(component, ...args) {
  if (!DEBUG_MODE) return;
  const style = `
        color: red;
        font-weight: bold;
    `;
  console.log(`%c[${component}]`, style, ...args);
}
