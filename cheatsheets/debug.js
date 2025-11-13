// debug.js
// Minimal debug logger with source, color, and debug mode switch

// Set this to true to enable logging, false to disable
export let DEBUG_MODE = true;

/**
 * Enable or disable debug mode dynamically
 * @param {boolean} value
 */
export const setDebugMode = (value) => {
  DEBUG_MODE = value;
};

/**
 * Log a message with optional color and source label
 * @param {string} source - The source or label of the message
 * @param {*} message - The message or data to log
 * @param {string} color - Optional color name (red, green, yellow, cyan, purple)
 */
export const debug = (source, message, color = "cyan") => {
  if (!DEBUG_MODE) return;

  const colors = {
    red: "color: #ff5555; font-weight: bold;",
    green: "color: #50fa7b; font-weight: bold;",
    yellow: "color: #f1fa8c; font-weight: bold;",
    cyan: "color: #8be9fd; font-weight: bold;",
    purple: "color: #bd93f9; font-weight: bold;",
  };

  console.log(`%c[${source}]`, colors[color] || colors.cyan, message);
};
