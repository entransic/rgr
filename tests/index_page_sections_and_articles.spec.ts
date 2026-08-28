import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for Home page", () => {
  test.describe.configure({ mode: "parallel" });

//
// BEFORE EACH SETUP
// OPEN BROWSER AND GOTO INDEXPAGE
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

  test("index page will have at least 4 articles within the section", async({page}) => {
    await expect (homePage.locator("section").nth(0).locator("article").nth(3)).toBeAttached();
  })

  test("index page will have 4 unique articles within the section", async({page}) => {
    for (let x:number=0; x<4; x++){
      await expect (homePage.locator("section").nth(0).locator("article").nth(x)).toBeAttached();
    }
  })

  test("the 4 unique articles within the first section will have text", async({page}) => {
    for (let x:number=0; x<4; x++){
      await expect (homePage.locator("section").nth(0).locator("article").nth(x)).toContainText("ipsum");
    }
  })

  test("the first section will have a h2 with text bug status", async({page}) => {
      await expect (homePage.locator("section").nth(0).locator("h2").nth(0)).toContainText("bug status");
  })

  test("the 4 unique articles within the first section will have unique titles for the report types", async({page}) => {
    let title:string = ["open/closed", "find rate", "fix rate", "by status"]
    for (let x:number=0; x<4; x++){
      await expect (homePage.locator("section").nth(0).locator("article").nth(x).locator("h3")).toContainText(title[x]);
    }
  })

  test("the 4 unique articles within the first section will have unique divs for the graph", async({page}) => {
    for (let x:number=0; x<4; x++){
      await expect (homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toBeAttached();;
    }
  })

  test("the 4 unique articles within the first section will have unique divs for the graph with a unique icss id", async({page}) => {
    let id:string = ["graph-open-closed", "graph-find-rate", "graph-fix-rate", "graph-by-status"]
    for (let x=0; x<4; x++){
      await expect (homePage.locator("section").nth(0).locator("article").nth(x).locator("div")).toHaveId(id[x]);
    }
  })

  test("the 4 unique articles within the first section will have unique ids for the reports", async({page}) => {
    let id:string = ["report-open-closed", "report-find-rate", "report-fix-rate", "report-by-status"]
    for (let x=0; x<4; x++){
      await expect (homePage.locator("section").nth(0).locator("article").nth(x)).toHaveId(id[x]);
    }
  });
//
// AFTER ALL TEARDOWN 
//
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

