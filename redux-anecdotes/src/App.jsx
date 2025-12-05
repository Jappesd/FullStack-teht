import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useState } from "react";
const App = () => {
  const [notif, setNotif] = useState("");
  const notify = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(""), 2000);
  };
  return (
    <div>
      <Notification message={notif} />
      <AnecdoteList notify={notify} />
      <AnecdoteForm />
    </div>
  );
};
export default App;
