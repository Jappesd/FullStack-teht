import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      // payload is just the content string
      state.push({
        content: action.payload,
        important: false,
        id: generateId(),
      });
    },
    toggleImportanceOf(state, action) {
      const id = action.payload; // just the ID
      const note = state.find((n) => n.id === id);
      if (note) {
        note.important = !note.important; // direct mutation, Immer handles immutability
      }
    },
  },
});

// Action creators
export const { createNote, toggleImportanceOf } = noteSlice.actions;

// Reducer
export default noteSlice.reducer;
