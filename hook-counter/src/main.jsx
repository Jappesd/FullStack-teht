import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CounterContextProvider } from "./CounterContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CounterContextProvider>
      <App />
    </CounterContextProvider>
  </StrictMode>
);
