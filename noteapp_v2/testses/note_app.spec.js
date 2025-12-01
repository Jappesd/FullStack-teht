import { test, expect } from "@playwright/test";
import { getByTestId } from "@testing-library/react";
import { beforeEach } from "node:test";
import { loginWith, createNote } from "./helper.js";
const id = "Sammy";
const pass = "kokkola";
const url = "http://localhost:5173";
test.beforeEach(async ({ page }) => {
  await page.goto(url);
});
test("front page can be opened", async ({ page }) => {
  const locator = page.getByText("Notes");
  await expect(locator).toBeVisible();
  await expect(page.getByText("Noteapp by Sami")).toBeVisible();
});
test("user can log in", async ({ page }) => {
  await loginWith(page, "Sammy", "kokkola");
  await expect(page.getByText("Welcome Sami!")).toBeVisible();
});
test.describe("Note app", () => {
  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      // open app
      await page.goto("http://localhost:5173");

      // open login form if hidden
      await loginWith(page, "Sammy", "kokkola");

      // confirm login succeeded
      await expect(page.getByText("Welcome Sami!")).toBeVisible();
    });

    test("a new note can be created", async ({ page }) => {
      // create a unique note text so it won’t collide with existing notes
      const noteText = `a note created by playwright ${Date.now()}`;

      // open new note form
      await createNote(page, noteText);
      // find the note by its content (ignores emojis)
      const newNote = page.locator('[data-testid^="note-"]', {
        hasText: noteText,
      });

      // wait until visible
      await newNote.waitFor({ state: "visible", timeout: 5000 });

      // assert the note contains the text we typed
      await expect(newNote).toContainText(noteText);
    });
  });
});

test("login fails with wrong password", async ({ page }) => {
  await page.getByTestId("login-btn").click();
  await page.getByTestId("login-username").fill(id);
  await page.getByTestId("login-password").fill("huima");
  await page.getByTestId("login-submit").click();

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});
