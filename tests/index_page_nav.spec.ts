import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for index page nav elements", () => {
 
  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE EACH SETUP
  //
 
  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    homePage = await sharedContext.newPage();

    await homePage.goto(homeURL);
  });

  //
  // TESTS 
  //
 
  test("the nav will have Node Home", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("the nav will have node About", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("the nav will have Node Search", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "Search" })).toBeVisible();
  });

  test("the nav will have a node Submit", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "Submit" })).toBeVisible();
  });

  test("the nav will have the application name rarify", async ({ page }) => {
    await expect(homePage.locator('header').getByText('Rarify')).toBeVisible();
  });

  //
  // AFTER ALL TEARDOWN
  //
 
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

