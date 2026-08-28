import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let aboutPage: Page;
let title: string = "About Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for about page navigation", () => {
  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE ALL SETUP
  // OPEN BROWSER AND GOTO INDEX PAGE
  //

  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    aboutPage = await sharedContext.newPage();

    await aboutPage.goto(aboutURL);
  });

  //
  // TESTS
  //

  test("Home can be selected and takes the user to the home page", async ({ page }) => {
    await aboutPage.getByRole("link", { name: "Home" }).click();
    await expect(aboutPage).toHaveURL(homeURL);
  });

  test("About can be selected and takes the user to the about page", async ({ page }) => {
    await aboutPage.getByRole("link", { name: "About" }).click();
    await expect(aboutPage).toHaveURL(aboutURL);
  });

  test("Search can be selected and takes the user to the search page", async ({ page }) => {
    await aboutPage.getByRole("link", { name: "Search" }).click();
    await expect(aboutPage).toHaveURL(searchURL);
  });

  test("Submit can be selected and takes the user to the submit page", async ({ page }) => {
    await aboutPage.getByRole("link", { name: "Submit" }).click();
    await expect(aboutPage).toHaveURL(submitURL);
  });

  //
  // AFTER ALL TEARDOWN
  //

  test.afterAll(async () => {
    await sharedContext.close();
  });
});
