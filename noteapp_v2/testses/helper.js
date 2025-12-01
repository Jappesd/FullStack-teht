export const loginWith = async (page, username, password) => {
  await page.getByTestId("login-btn").click();
  await page.getByTestId("login-username").fill(username);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();
};
export const createNote = async (page, content) => {
  await page.getByTestId("note-input").fill(content);
  await page.getByTestId("note-submit").click();
};
