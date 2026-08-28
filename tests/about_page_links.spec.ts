import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let aboutPage: Page;
let title: string = "About Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for about page links", () => {
  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE ALL SETUP
  // OPEN BROWSER AND GOTOT INDEX PAGE
  //

  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    aboutPage = await sharedContext.newPage();

    await aboutPage.goto(aboutURL);
  });

  //
  // TESTS
  //

  test("the nav will have Node Home", async ({ page }) => {
    await expect(aboutPage.getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("the nav will have node About", async ({ page }) => {
    await expect(aboutPage.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("the nav will have node Search", async ({ page }) => {
    await expect(aboutPage.getByRole("link", { name: "Search" })).toBeVisible();
  });

  test("the nav will have node Submit", async ({ page }) => {
    await expect(aboutPage.getByRole("link", { name: "Submit" })).toBeVisible();
  });

  //
  // AFTER ALL TESTDOWN
  //

  test.afterAll(async () => {
    await sharedContext.close();
  });
});
