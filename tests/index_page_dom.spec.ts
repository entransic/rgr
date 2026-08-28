import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for index page DOM", () => {

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
  
  test('index page exists and root is present"', async ({ page }) => {
    await expect(homePage).toHaveURL(homeURL);
  });

  test("index page has the title 'Home Page'", async ({ page }) => {
    await expect(homePage).toHaveTitle(title);
  });

  test("index page will have a <nav> element within <header>", async ({ page }) => {
    await expect(homePage.locator("header").filter({ has: homePage.locator("nav") })).toBeAttached();
  });

  test("index page will have a <main> element within <body>", async ({ page }) => {
    await expect(homePage.locator("body").filter({ has: homePage.locator("main") })).toBeAttached();
  });

  test("index page will have a <aside> element within <body>", async ({ page }) => {
    await expect(homePage.locator("body").filter({ has: homePage.locator("aside") })).toBeAttached();
  });
  
  //
  // AFTER ALL TEARDOWN
  // 
  
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

