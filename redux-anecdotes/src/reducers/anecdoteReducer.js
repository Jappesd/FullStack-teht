import { createSlice } from "@reduxjs/toolkit";
import anecService from "../services/anecdotes";
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnec = action.payload;
      if (newAnec.votes === undefined) newAnec.votes = 0;
      state.push(newAnec);
    },
    vote(state, action) {
      const updatedAnec = action.payload;
      const index = state.findIndex((a) => a.id === updatedAnec.id);
      if (index !== -1) state[index] = updatedAnec;
    },
    setState(state, action) {
      return action.payload;
    },
  },
});
const { createAnecdote, setState, vote } = anecdoteSlice.actions;

export const getAnecs = () => {
  return async (dispatch) => {
    const fetchedanec = await anecService.getAll();
    const anecs = fetchedanec.map((n) => ({
      ...n,
      votes: n.votes || 0,
    }));
    dispatch(setState(anecs));
  };
};
export const creator = (content) => {
  return async (dispatch) => {
    const newAnec = await anecService.createAnec(content);
    dispatch(createAnecdote(newAnec));
  };
};
export const updateAnec = (anec) => {
  return async (dispatch) => {
    const updated = await anecService.updateAnec({
      ...anec,
      votes: anec.votes + 1,
    });
    dispatch(vote(updated));
  };
};

export default anecdoteSlice.reducer;
