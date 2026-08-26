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

  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    homePage = await sharedContext.newPage();

    await homePage.goto(homeURL);
  });

  /*
   check for the presence of the main page elements:
    - check that the index page exists and the root is present
    - check that the index page has the title "Red Green Refactor"
    - check that the index page has html semantic element <main>
    - check that the index page will have a <nav> element within <header>
  */
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

  /*
    check for the presence of the main page navigation elements:
    - check that the main page will have a node Home
    - check that the main page will have a node About
    - check that the main page will have a node Search
    - check that the main page will have a node Submit
  */

  test("the nav will have Node Home", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("the nav will have node About", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("the nav will have Node Search", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "Search" })).toBeVisible();
  });

  test("the nav will have a node Submit", async ({ page }) => {
    await expect(homePage.getByRole("link", { name: "Submit" })).toBeVisible();
  });

  test("the nav will have the application name rarify", async ({ page }) => {
    await expect(homePage.locator('header').getByText('Rarify')).toBeVisible();
  });


  /* 
  check that the main page navigation elements will take the user to the correct page:
  - check that the Home node will take the user to the home page
  - check that the About node will take the user to the about page
  - check that the Search node will take the user to the search page
  - check that the Submit node will take the user to the submit page
  */

  test("Home can be selected and takes the user to the home page", async ({ page }) => {
    await homePage.getByRole("link", { name: "Home" }).click();
    await expect(homePage).toHaveURL(homeURL);
  });

  test("About can be selected and takes the user to the about page", async ({ page }) => {
    await homePage.getByRole("link", { name: "About" }).click();
    await expect(homePage).toHaveURL(aboutURL);
  });

  test("Search can be selected and takes the user to the search page", async ({ page }) => {
    await homePage.getByRole("link", { name: "Search" }).click();
    await expect(homePage).toHaveURL(searchURL);
  });

  test("Submit can be selected and takes the user to the submit page", async ({ page }) => {
    await homePage.getByRole("link", { name: "Submit" }).click();
    await expect(homePage).toHaveURL(submitURL);
  });

  /*
   * Sections and articles
   */


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


  /* 
   Check the footer exists 
   has the correct copyright dates
   the text 'All Rights Reserved' is present
   the company name is correct int he footer
  */

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

  test.afterAll(async () => {
    await sharedContext.close();
  });
});
