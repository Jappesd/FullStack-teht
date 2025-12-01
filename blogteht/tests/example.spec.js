// @ts-check
import { test, expect } from "@playwright/test";
import { loginWith, createBlog, returnCreateBlog } from "./helper.js";

const url = "http://localhost:5173";
const user = "alice";
const pass = "password123";
test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("login form is shown", async ({ page }) => {
  await expect(page.getByTestId("login-btn")).toBeVisible();
  await expect(page.getByTestId("login-user")).toBeVisible();
  await expect(page.getByTestId("login-pass")).toBeVisible();
  //check that no blogs are visible
  const blogs = page.locator('[data-testid^="blog-"]');
  await expect(blogs).toHaveCount(0);
});
test("login with wrong password", async ({ page }) => {
  await loginWith(page, user, "asd");
  await expect(page.getByText("Wrong credentials")).toBeVisible();
});
test("login works", async ({ page }) => {
  await loginWith(page, user, pass);
  await expect(page.getByText("Welcome Alice")).toBeVisible();
});

test.describe("when logged in", () => {
  test.beforeEach(async ({ page }) => {
    await loginWith(page, user, pass);
    await expect(page.getByText("Welcome Alice")).toBeVisible();
  });
  test("able to create a blog", async ({ page }) => {
    await createBlog(page, "Blogger", "Playwright", "http://waterver.com");
    await expect(page.getByText(`Blogger by Playwright`)).toBeVisible();
  });
  test("user can like the first blog", async ({ page }) => {
    // get the first blog in the list
    const firstBlog = page.locator('[data-testid^="blog-"]').first();

    const likesContainer = firstBlog.locator("p", { hasText: "Likes:" });
    // get its id from the data-testid attribute
    const idAttr = await firstBlog.getAttribute("data-testid"); // e.g., "blog-12345"
    const blogId = idAttr?.split("-")[1];
    await firstBlog.getByTestId(`view-btn-${blogId}`).click();
    // get current likes
    const text = await likesContainer.textContent(); // e.g., "Likes: 3 Like"
    const match = text?.match(/Likes:\s*(\d+)/);
    const currentLikes = match ? parseInt(match[1]) : 0;

    // click the like button
    const likeBtn = firstBlog.getByTestId(`like-btn-${blogId}`);
    await likeBtn.click();

    // assert likes incremented
    await expect(likesContainer).toHaveText(`Likes: ${currentLikes + 1} Like`);
  });
});
test.describe("Blog app - delete button (creator only)", () => {
  test("creator can see and delete their blog", async ({ page }) => {
    // login as creator and create a blog
    await page.goto(url);
    await loginWith(page, "alice", "password123");
    const blog = await returnCreateBlog(page, {
      title: "Blog to delete safely",
      author: "Author",
      url: "http://example.com",
    });
    const blogId = blog.id;

    // locate the blog and reveal details
    const blogItem = page.getByTestId(`blog-${blogId}`);
    await blogItem.getByTestId(`view-btn-${blogId}`).click();

    // check delete button is visible
    const deleteBtn = blogItem.locator("button", { hasText: "Delete" });
    await expect(deleteBtn).toBeVisible();

    // handle confirmation dialog
    page.once("dialog", async (dialog) => await dialog.accept());
    await deleteBtn.click();

    // assert the blog is removed
    await expect(blogItem).toHaveCount(0);
  });
});

test("delete button hidden for non-creator", async ({ page }) => {
  // User A creates a blog
  await loginWith(page, user, pass);
  const blog = await returnCreateBlog(page, {
    title: "Blog for other user",
    author: "Author",
    url: "http://example.com",
  });

  // User B logs in
  await page.locator('[data-testid="logout-btn"]').click();
  await loginWith(page, "bob", "securepass");

  const blogItem = page.getByTestId(`blog-${blog.id}`);
  await blogItem.getByTestId(`view-btn-${blog.id}`).click();

  const deleteBtn = blogItem.locator("button", { hasText: "Delete" });
  await expect(deleteBtn).toHaveCount(0);
});

test.describe("Blog app - sorting", () => {
  test("blogs are sorted by likes (most first)", async ({ page }) => {
    await page.goto(url);
    await loginWith(page, "alice", "password123");
    await page
      .getByText("Welcome Alice")
      .waitFor({ state: "visible", timeout: 5000 });
    // get all blogs in the rendered list
    const blogItems = page.locator('[data-testid^="blog-"]');
    const count = await blogItems.count();
    expect(count).toBeGreaterThan(1); // make sure there are multiple blogs

    // get the number of likes for each blog
    const likesArray = [];
    for (let i = 0; i < count; i++) {
      const blog = blogItems.nth(i);
      const dataTestId = await blog.getAttribute("data-testid");
      const blogId = dataTestId?.split("-")[1];
      await blog.getByTestId(`view-btn-${blogId}`).click();
      const likesText = await blog
        .locator("p", { hasText: "Likes:" })
        .textContent();
      const match = likesText?.match(/Likes:\s*(\d+)/);
      likesArray.push(match ? parseInt(match[1]) : 0);
    }

    // check that likes are sorted descending
    for (let i = 0; i < likesArray.length - 1; i++) {
      expect(likesArray[i]).toBeGreaterThanOrEqual(likesArray[i + 1]);
    }
  });
});
