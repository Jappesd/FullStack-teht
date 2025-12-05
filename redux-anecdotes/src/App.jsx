import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";
import { NotificationWrapper } from "./components/NotifWrapper";
const App = () => {
  return (
    <div>
      <NotificationProvider>
        <NotificationWrapper />
        <AnecdoteList />
        <AnecdoteForm />
      </NotificationProvider>
    </div>
  );
};
export default App;
