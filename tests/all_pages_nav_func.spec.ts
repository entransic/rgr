import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let testPage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";
let urls: string[] = [homeURL, aboutURL, searchURL, submitURL]

test.describe("Basic tests for nav links", () => {

  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE EACH SETUP
  // OPEN BROWSER THEN GOTO INDEX PAGE
  //
 
  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    testPage = await sharedContext.newPage();
  });

  //
  // TESTS
  //

  for (const url in urls){
  test(`Home can be selected and takes the user to the home page from ${url}`, async ({ page }) => {
    await testPage.goto(url);
    await testPage.getByRole("link", { name: "Home" }).click();
    await expect(testPage).toHaveURL(homeURL);
  });

  test(`About can be selected and takes the user to the about page from ${url}`, async ({ page }) => {
    await testPage.goto(url);
    await testPage.getByRole("link", { name: "About" }).click();
    await expect(testPage).toHaveURL(aboutURL);
  });

  test(`Search can be selected and takes the user to the search page from ${url}`, async ({ page }) => {
    await testPage.goto(url);
    await testPage.getByRole("link", { name: "Search" }).click();
    await expect(testPage).toHaveURL(searchURL);
  });

  test(`Submit can be selected and takes the user to the submit pagei from ${url}`, async ({ page }) => {
    await testPage.goto(url);
    await testPage.getByRole("link", { name: "Submit" }).click();
    await expect(testPage).toHaveURL(submitURL);
  });

  //
  // AFTER ALL TEARDOWN
  //
 
  test.afterAll(async () => {
    await sharedContext.close();
  });
  }
});

