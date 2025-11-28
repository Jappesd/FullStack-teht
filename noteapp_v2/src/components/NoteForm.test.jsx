import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App.jsx";
import noteService from "../services/notes.js";

// Mock the default export properly
vi.mock("../services/notes.js", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    remove: vi.fn(),
    setToken: vi.fn(),
    update: vi.fn(),
  },
}));

describe("Note app", () => {
  const mockNotes = [
    {
      id: "1",
      content: "First test note",
      important: true,
      user: { name: "Sammy", id: "123" },
    },
    {
      id: "2",
      content: "Second test note",
      important: false,
      user: { name: "Sammy", id: "123" },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    noteService.getAll.mockResolvedValue(mockNotes);
  });

  test("renders note form disabled when no user is logged in", async () => {
    render(<App />);

    const inputs = await screen.findAllByRole("textbox");
    const disabledInput = inputs.find((input) => input.disabled);
    expect(disabledInput).toBeDisabled();

    const saveButtons = screen.getAllByRole("button", { name: /save/i });
    const disabledBtn = saveButtons.find((btn) => btn.disabled);
    expect(disabledBtn).toBeDisabled();
  });

  test("renders note form enabled when user is logged in", async () => {
    window.localStorage.setItem(
      "loggedUser",
      JSON.stringify({ name: "Sammy", token: "123" })
    );

    render(<App />);

    const inputs = await screen.findAllByRole("textbox");
    const enabledInput = inputs.find((input) => !input.disabled);
    expect(enabledInput).toBeInTheDocument();

    const saveButtons = screen.getAllByRole("button", { name: /save/i });
    const enabledBtn = saveButtons.find((btn) => !btn.disabled);
    expect(enabledBtn).toBeInTheDocument();
  });

  test("shows delete button for logged-in user", async () => {
    window.localStorage.setItem(
      "loggedUser",
      JSON.stringify({ name: "Sammy", token: "123" })
    );

    render(<App />);

    const deleteBtns = await screen.findAllByText(/delete/i);
    const deleteBtn = deleteBtns.find((btn) => !btn.disabled);
    expect(deleteBtn).toBeInTheDocument();
  });

  test("adds a new note", async () => {
    window.localStorage.setItem(
      "loggedUser",
      JSON.stringify({ name: "Sammy", token: "123" })
    );

    const newNoteContent = "A new note";

    noteService.create.mockResolvedValue({
      id: "3",
      content: newNoteContent,
      important: false,
      user: { name: "Sammy", id: "123" },
    });

    render(<App />);

    const input = await screen.findAllByRole("textbox");
    const enabledInput = input.find((i) => !i.disabled);
    fireEvent.change(enabledInput, { target: { value: newNoteContent } });

    const saveButtons = screen.getAllByRole("button", { name: /save/i });
    const enabledBtn = saveButtons.find((btn) => !btn.disabled);
    fireEvent.click(enabledBtn);

    const newNote = await screen.findByText(newNoteContent);
    expect(newNote).toBeInTheDocument();
  });
});
