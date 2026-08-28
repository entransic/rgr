import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let aboutPage: Page;
let title: string = "About Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for about page DOM", () => {
  test.describe.configure({ mode: "parallel" });
  //
  // BEFORE EACH SETUP
  // OPEN BROWSER THEN GOTO INDEX PAGE
  //

  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    aboutPage = await sharedContext.newPage();

    await aboutPage.goto(aboutURL);
  });

  //
  // TESTS
  //

  test('about page exists and root is present"', async ({ page }) => {
    await expect(aboutPage).toHaveURL(aboutURL);
  });

  test('about page has the title "About RGR"', async ({ page }) => {
    await expect(aboutPage).toHaveTitle(title);
  });

  test("about page will have a <nav> element within <header>", async ({ page }) => {
    await expect(aboutPage.locator("header").filter({ has: aboutPage.locator("nav") })).toBeAttached();
  });

  test("about page will have a <main> element within <body>", async ({ page }) => {
    await expect(aboutPage.locator("body").filter({ has: aboutPage.locator("main") })).toBeAttached();
  });

  test("about page will have a <aside> element within <body>", async ({ page }) => {
    await expect(aboutPage.locator("body").filter({ has: aboutPage.locator("aside") })).toBeAttached();
  });

  //
  // AFTER ALL TEARDOWN
  //

  test.afterAll(async () => {
    await sharedContext.close();
  });
});
