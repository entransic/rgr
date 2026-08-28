import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let searchPage: Page;
let title: string = "Search RGR";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for Search page", () => {
  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE ALL SETUP
  // OPEN BROWSER AND GOTO PAGE 
  //
  
  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    searchPage = await sharedContext.newPage();

    await searchPage.goto(searchURL);
  });

  //
  // TESTS 
  //
  
  test("Verify the footer is present on the search page", async ({ page }) => {
    await expect(searchPage.locator("footer")).toBeAttached();
  });

  test("Verify the copyright symbol is present", async ({ page }) => {
    await expect(searchPage.locator("footer")).toContainText("©");
  });

  test("Verify the company name in the footer", async ({ page }) => {
    await expect(searchPage.locator("footer")).toContainText("entransic hypermedia, LLC");
  });

  test("Verify the year is current for the copyright in the footer", async ({ page }) => {
    await expect(searchPage.locator("footer")).toContainText(String(new Date().getFullYear()));
  });

  test("Verify the text All Rights Reserved is present in the copyright statement in the footer", async ({ page }) => {
    await expect(searchPage.locator("footer")).toContainText("All Rights Reserved");
  });


  // 
  // AFTER ALL TEARDOWN
  //
  
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

