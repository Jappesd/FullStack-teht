import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../reducers/FilterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <div>
      <input value={filter} onChange={handleChange} placeholder="Search" />
    </div>
  );
};
export default Filter;
