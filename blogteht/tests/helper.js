export const loginWith = async (page, username, password) => {
  await page.getByTestId("login-user").fill(username);
  await page.getByTestId("login-pass").fill(password);
  await page.getByTestId("login-btn").click();
};
export const createBlog = async (page, title, author, url) => {
  await page.getByTestId("newblog-btn").click();
  await page.getByTestId("blog-title").fill(title);
  await page.getByTestId("blog-author").fill(author);
  await page.getByTestId("blog-url").fill(url);
  await page.getByTestId("submit-btn").click();
};
// helpers.js
export const returnCreateBlog = async (page, { title, author, url }) => {
  await page.getByTestId("newblog-btn").click();
  await page.getByTestId("blog-title").fill(title);
  await page.getByTestId("blog-author").fill(author);
  await page.getByTestId("blog-url").fill(url);
  await page.getByTestId("submit-btn").click();

  // wait for the new blog to appear by its title
  const newBlog = page
    .locator('[data-testid^="blog-"]')
    .filter({ hasText: title });
  await newBlog.waitFor({ state: "visible", timeout: 5000 });

  // get the id from data-testid
  const idAttr = await newBlog.getAttribute("data-testid");
  const id = idAttr?.split("-")[1];

  return { id, title, author, url };
};
