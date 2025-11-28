# React Testing with Vitest & Testing Library - Cheat Sheet

---

## 1. Mocking Modules with `vi.mock()`

```js
// Mock the default export of a module
vi.mock("../services/notes.js", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
  },
}));
/*vi.fn() creates a mock function you can control.

Use mockResolvedValue(value) for async functions that return promises.*/

//2. Querying Elements
screen.getByRole("textbox"); // throws if not found
screen.queryByRole("textbox"); // returns null if not found
screen.getAllByRole("button"); // returns all matching elements
screen.getByText(/delete/i); // match text (case-insensitive)
/*Use *AllBy* when multiple matches exist.

get* → throws if missing; query* → safe for conditional checks.*/

//3. LocalStorage Mocking
window.localStorage.setItem(
  "loggedUser",
  JSON.stringify({ name: "Sammy", token: "123" })
);
/*Simulate a logged-in user.

Component code reading from localStorage behaves as in the browser.*/

//4. Conditional Rendering Tests
//Check elements that appear only for logged-in users:

const input = screen.queryAllByRole("textbox");
const disabledInput = input.find((i) => i.disabled);
expect(disabledInput).toBeDisabled();

const saveBtn = screen.getByRole("button", { name: /save/i });
expect(saveBtn).not.toBeDisabled();

//Works well for forms/buttons controlled by state.

//5. Asynchronous Mocks
noteService.getAll.mockResolvedValue([
  { id: "1", content: "Test note", user: { name: "Sammy" } },
]);

/* Simulates data returned from an API.

Useful for testing components that fetch data in useEffect.*/

//6. Handling Multiple Elements in Tests

//If multiple matches exist:

const allInputs = screen.queryAllByRole("textbox");
const correctInput = allInputs.find((input) => input.disabled);

//Pick the specific element you need for assertions.

//7. Key Assertions
expect(element).toBeInTheDocument();
expect(element).toBeDisabled();
expect(element).not.toBeDisabled();
expect(screen.queryByText(/delete/i)).toBeNull(); // element shouldn't exist

/*8. Tips

Always reset mocks between tests if needed: vi.clearAllMocks().

Wrap async operations in await and findBy* when testing state changes after Promises.

Render <App /> after setting localStorage for correct logged-in state.*/
```
