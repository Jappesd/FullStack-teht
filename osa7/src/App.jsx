import { useCounter } from "./hooks/counterHook";
import { useField } from "./hooks/fieldHook";
const App = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");
  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}cm
      </div>
    </div>
  );
};

export default App;
