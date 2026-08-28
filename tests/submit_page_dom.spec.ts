import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let submitPage: Page;
let title: string = "Search RGR";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for submit page DOM", () => {
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
  
  test('submit page exists and root is present"', async ({ page }) => {
    await expect(submitPage).toHaveURL(searchURL);
  });

  test('submit page has the title "Search RGR"', async ({ page }) => {
    await expect(submitPage).toHaveTitle(title);
  });

  test("submit page will have a <nav> element within <header>", async ({ page }) => {
    await expect(submitPage.locator("header").filter({ has: submitPage.locator("nav") })).toBeAttached();
  });

  test("submit page will have a <aside> element within <header>", async ({ page }) => {
    await expect(submitPage.locator("body").filter({ has: submitPage.locator("aside") })).toBeAttached();
  });

  test("submit page will have a <main> element within <header>", async ({ page }) => {
    await expect(submitPage.locator("body").filter({ has: submitPage.locator("main") })).toBeAttached();
  });

  //
  // AFTER ALL TEARDOWN 
  //
  
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

