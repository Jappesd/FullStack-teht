import { createSlice, current } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      // payload is just the content string
      const newNote = action.payload;
      state.push(newNote);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload; // just the ID
      const note = state.find((n) => n.id === id);
      if (note) {
        note.important = !note.important; // direct mutation, Immer handles immutability
      }
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});
const { setNotes, createNote } = noteSlice.actions;
export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};
export const appendNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };
};
// Action creators
export const { toggleImportanceOf } = noteSlice.actions;

// Reducer
export default noteSlice.reducer;
