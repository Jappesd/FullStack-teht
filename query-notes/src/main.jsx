import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
const queryclient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryclient}>
    <App />
  </QueryClientProvider>
);
