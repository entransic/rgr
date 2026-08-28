import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for index page nav links", () => {

  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE EACH SETUP
  // OPEN BROWSER THEN GOTO INDEX PAGE
  //
 
  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    homePage = await sharedContext.newPage();

    await homePage.goto(homeURL);
  });

  //
  // TESTS
  //
 
  test("Home can be selected and takes the user to the home page", async ({ page }) => {
    await homePage.getByRole("link", { name: "Home" }).click();
    await expect(homePage).toHaveURL(homeURL);
  });

  test("About can be selected and takes the user to the about page", async ({ page }) => {
    await homePage.getByRole("link", { name: "About" }).click();
    await expect(homePage).toHaveURL(aboutURL);
  });

  test("Search can be selected and takes the user to the search page", async ({ page }) => {
    await homePage.getByRole("link", { name: "Search" }).click();
    await expect(homePage).toHaveURL(searchURL);
  });

  test("Submit can be selected and takes the user to the submit page", async ({ page }) => {
    await homePage.getByRole("link", { name: "Submit" }).click();
    await expect(homePage).toHaveURL(submitURL);
  });

  //
  // AFTER ALL TEARDOWN
  //
 
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

