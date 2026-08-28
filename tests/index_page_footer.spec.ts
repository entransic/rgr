import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for index page footer", () => {

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

  test("Verify the footer is present on the home page", async ({ page }) => {
    await expect(homePage.locator("footer")).toBeAttached();
  });

  test("Verify the copyright symbol is present", async ({ page }) => {
    await expect(homePage.locator("footer")).toContainText("©");
  });

  test("Verify the company name in the footer", async ({ page }) => {
    await expect(homePage.locator("footer")).toContainText("entransic hypermedia, LLC");
  });

  test("Verify the year is current for the copyright in the footer", async ({ page }) => {
    await expect(homePage.locator("footer")).toContainText(String(new Date().getFullYear()));
  });

  test("Verify the text All Rights Reserved is present in the copyright statement in the footer", async ({ page }) => {
    await expect(homePage.locator("footer")).toContainText("All Rights Reserved");
  });

//
// AFTER ALL TEARDOWN
//

  test.afterAll(async () => {
    await sharedContext.close();
  });
});

