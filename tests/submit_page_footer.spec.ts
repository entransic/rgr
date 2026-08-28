import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let submitPage: Page;
let title: string = "Search RGR";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for submit page footer", () => {
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
  
  test("Verify the footer is present on the submit page", async ({ page }) => {
    await expect(submitPage.locator("footer")).toBeAttached();
  });

  test("Verify the copyright symbol is present", async ({ page }) => {
    await expect(submitPage.locator("footer")).toContainText("©");
  });

  test("Verify the company name in the footer", async ({ page }) => {
    await expect(submitPage.locator("footer")).toContainText("entransic hypermedia, LLC");
  });

  test("Verify the year is current for the copyright in the footer", async ({ page }) => {
    await expect(submitPage.locator("footer")).toContainText(String(new Date().getFullYear()));
  });

  test("Verify the text All Rights Reserved is present in the copyright statement in the footer", async ({ page }) => {
    await expect(submitPage.locator("footer")).toContainText("All Rights Reserved");
  });

  //
  // AFTER ALL TEARDOWN
  //
  
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

