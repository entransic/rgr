import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";
let reportTitle: string[] = ["open/closed", "find rate", "fix rate", "by status"];
let reportArticleID: string[] = ["report-open-closed", "report-find-rate", "report-fix-rate", "report-by-status"];
let graphID: string[] = ["graph-open-closed", "graph-find-rate", "graph-fix-rate", "graph-by-status"];

test.describe("Basic tests for Home page", () => {
  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE EACH SETUP
  // OPEN BROWSER AND GOTO INDEX PAGE
  //

  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    homePage = await sharedContext.newPage();

    await homePage.goto(homeURL);
  });

  //
  // TESTS
  //

  test("index page will have a <section> element within <main> for description of app", async ({ page }) => {
    await expect(homePage.locator("main").filter({ has: homePage.locator("section") })).toBeAttached();
  });

  test("index page will have an <article> element within <section> for description text", async ({ page }) => {
    await expect(homePage.locator("section").filter({ has: homePage.locator("article") })).toBeAttached();
  });

  test("index page will have at least 4 articles within the section", async ({ page }) => {
    await expect(homePage.locator("section").nth(0).locator("article").nth(3)).toBeAttached();
  });

  test("index page will have 4 unique articles within the section", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x)).toBeAttached();
    }
  });

  test("the first section will have a h2 with text bug status", async ({ page }) => {
    await expect(homePage.locator("h2").nth(0)).toContainText("bug status");
  });

  //
  // TEST OF MEDIA WIDTH FOR GRID 
  //
  test("the first section will have padding of 15px, 30px", async ({ page }) => {
    await homePage.setViewportSize({width: 1380, height:1080})
    await expect(homePage.locator("section").nth(0)).toHaveCSS("padding", "15px 30px");
  });

  test("the first section will have display: grid", async ({ page }) => {
    await homePage.setViewportSize({width: 1380, height:1080})
    await expect(homePage.locator("section").nth(0)).toHaveCSS("display", "grid");
  });
  
  test("the first section will have grid gap of 1rem", async ({ page }) => {
    await homePage.setViewportSize({width: 1380, height:1080})
    await expect(homePage.locator("section").nth(0)).toHaveCSS("grid-gap", "16px");
  });
 
  //
  // TEST OF MEDIA WIDTH FOR FLEX 
  //
  test("the first section will have padding of 30px", async ({ page }) => {
    await homePage.setViewportSize({width: 1280, height:1080})
    await expect(homePage.locator("section").nth(0)).toHaveCSS("padding", "30px");
  });

  test("the first section will have display: flex", async ({ page }) => {
    await homePage.setViewportSize({width: 1280, height:1080})
    await expect(homePage.locator("section").nth(0)).toHaveCSS("display", "flex");
  });
  

  test("the 4 unique articles within the first section will have unique titles for the report types", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("h3")).toContainText(reportTitle[x]);
    }
  });

  test("the 4 unique articles within the first section will have unique divs for the graph", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toBeAttached();
    }
  });

  test("the 4 unique articles within the first section will have unique divs with CSS class for graphs", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toContainClass("graph");
    }
  });

  test("the 4 unique articles within the first section will have unique divs with a border for graphs", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveCSS("border", "1px solid rgb(51, 51, 51)");
    }
  });

  test("the 4 unique articles within the first section will have unique divs with width of 500px", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveCSS("width", "600px");
    }
  });

  test("the 4 unique articles within the first section will have unique divs with height of 300px", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveCSS("height", "300px");
    }
  });

  test("the 4 unique articles within the first section will have unique divs with border-radius of 10px", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveCSS("border-radius", "10px");
    }
  });

  test("the 4 unique articles within the first section will have unique divs with padding of 10px", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveCSS("padding", "10px");
    }
  });
  
  test("the 4 unique articles within the first section will have unique divs with margin of 10px", async ({ page }) => {
    for (let x: number = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveCSS("margin", "10px 5px");
    }
  });

  test("the 4 unique articles within the first section will have unique divs for the graph with a unique css id", async ({
    page,
  }) => {
    for (let x = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveId(graphID[x]);
    }
  });

  test("the 4 unique articles within the first section will have unique ids for the reports", async ({ page }) => {
    for (let x = 0; x < reportTitle.length; x++) {
      await expect(homePage.locator("section").nth(0).locator("article").nth(x)).toHaveId(reportArticleID[x]);
    }
  });

  //
  // AFTER ALL TEARDOWN
  //
  test.afterAll(async () => {
    await sharedContext.close();
  });
});
