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
  // OPEN BROWSER AND GOTO INDEX PAGE 
  //
  
  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    searchPage = await sharedContext.newPage();

    await searchPage.goto(searchURL);
  });

  //
  // TESTS 
  //
  
  test('search page exists and root is present"', async ({ page }) => {
    await expect(searchPage).toHaveURL(searchURL);
  });

  test('search page has the title "Search RGR"', async ({ page }) => {
    await expect(searchPage).toHaveTitle(title);
  });

  test("search page will have a <nav> element within <header>", async ({ page }) => {
    await expect(searchPage.locator("header").filter({ has: searchPage.locator("nav") })).toBeAttached();
  });

  test("search page will have a <main> element within <body>", async ({ page }) => {
    await expect(searchPage.locator("body").filter({ has: searchPage.locator("main") })).toBeAttached();
  });

  test("search page will have a <aside> element within <body>", async ({ page }) => {
    await expect(searchPage.locator("body").filter({ has: searchPage.locator("aside") })).toBeAttached();
  });
  
  //
  // AFTER ALL TEARDOWN
  //
  
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

