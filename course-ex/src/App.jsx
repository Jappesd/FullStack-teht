import NoteForm from "./components/noteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
const App = () => {
  const filteredSelection = (value) => {
    console.log(value);
  };
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
