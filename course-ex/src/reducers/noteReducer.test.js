import deepFreeze from "deep-freeze";
import { describe, expect, test } from "vitest";
import noteReducer, { toggleImportanceOf, createNote } from "./noteReducer.js";

describe("noteReducer", () => {
  test("returns a new state with action notes/createNote", () => {
    const state = [];
    deepFreeze(state);

    // Use the action creator directly
    const action = createNote("the app state is in redux store");

    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].content).toBe("the app state is in redux store");
    expect(newState[0].important).toBe(false);
    expect(newState[0].id).toBeDefined();
  });

  test("returns new state with action notes/toggleImportanceOf", () => {
    const state = [
      { content: "the app state is in redux store", important: true, id: 1 },
      {
        content: "state changes are made with actions",
        important: false,
        id: 2,
      },
    ];
    deepFreeze(state);

    // Use the action creator directly
    const action = toggleImportanceOf(2);

    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[0]); // first note unchanged
    expect(newState).toContainEqual({
      content: "state changes are made with actions",
      important: true, // toggled
      id: 2,
    });
  });
});
