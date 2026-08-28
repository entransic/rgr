import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let submitPage: Page;
let title: string = "Search RGR";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for submit page nav", () => {
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
  
  test("the nav will have Node Home", async ({ page }) => {
    await expect(submitPage.getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("the nav will have node About", async ({ page }) => {
    await expect(submitPage.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("the nav will have node Search", async ({ page }) => {
    await expect(submitPage.getByRole("link", { name: "Search" })).toBeVisible();
  });

  test("the nav will have node Submit", async ({ page }) => {
    await expect(submitPage.getByRole("link", { name: "Submit" })).toBeVisible();
  });

  // 
  // AFTER ALL TEARDOWN 
  //
  
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

