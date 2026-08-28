import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let submitPage: Page;
let title: string = "Search RGR";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for submit page links", () => {
  test.describe.configure({ mode: "parallel" });


  // 
  // BEFORE ALL SETUP
  // OPEN BROWSER AND GOTO PAGE 
  //
  
  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    submitPage = await sharedContext.newPage();

    await submitPage.goto(searchURL);
  });

  //
  // TESTS 
  //

  test("Home can be selected and takes the user to the home page", async ({ page }) => {
    await submitPage.getByRole("link", { name: "Home" }).click();
    await expect(submitPage).toHaveURL(homeURL);
  });

  test("About can be selected and takes the user to the about page", async ({ page }) => {
    await submitPage.getByRole("link", { name: "About" }).click();
    await expect(submitPage).toHaveURL(aboutURL);
  });

  test("Search can be selected and takes the user to the search page", async ({ page }) => {
    await submitPage.getByRole("link", { name: "Search" }).click();
    await expect(submitPage).toHaveURL(searchURL);
  });

  test("Submit can be selected and takes the user to the submit page", async ({ page }) => {
    await submitPage.getByRole("link", { name: "Submit" }).click();
    await expect(submitPage).toHaveURL(submitURL);
  });

  // 
  // AFTER ALL TEARDOWN
  //
  
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

