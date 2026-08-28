import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";

test.describe("Basic tests for index page nav css", () => {
 
  test.describe.configure({ mode: "parallel" });

  //
  // BEFORE EACH SETUP
  // OPEN BROWSER THEN GOTO INDEX PAGE 
  //
 
  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    homePage = await sharedContext.newPage();

    await homePage.goto(homeURL);
  });

  //
  // TESTS
  //
 
  test("the nav bar will be in a flex container", async({page}) =>{
    await expect (homePage.locator("header")).toHaveCSS("display", "flex")
  });

  test("the nav bar will justify-content between to separate logo from menu nodes", async({page}) =>{
    await expect (homePage.locator("header")).toHaveCSS("justify-content", "space-between")
  });

  test("the nav bar will align items in the center", async({page}) =>{
    await expect (homePage.locator("header")).toHaveCSS("align-items", "center")
  });

  test("the nav bar will have padding 15px and 30 px", async({page}) =>{
    await expect (homePage.locator("header")).toHaveCSS("padding", "15px 30px")
  });

  test("the nav bar will have background-color #333", async({page}) =>{
    await expect (homePage.locator("header")).toHaveCSS("background-color", "rgb(51, 51, 51)")
  });

  test("the nav bar will have text color #FFF", async({page}) =>{
    await expect (homePage.locator("header")).toHaveCSS("color", "rgb(255, 255, 255)")
  });

  test("the logo font size will be  24px", async({page}) =>{
    await expect (homePage.getByText("Rarify")).toHaveCSS("font-size", "24px")
  });

  test("the logo font weight will be  bold", async({page}) =>{
    await expect (homePage.getByText("Rarify")).toHaveCSS("font-weight", "700")
  });

  test("the ul links will have no bullets", async({page}) =>{
    let name:string = ["Home", "Submit", "Search", "About"]
    for (let x:number = 0; x < 4; x++) {
    await expect (homePage.getByText(name[x])).toHaveCSS("list-style", "outside none none")
  }
  });

  test("the ul link will be white", async({page}) =>{
    let name:string = ["Home", "Submit", "Search", "About"]
    for (let x:number = 0; x < 4; x++) {
    await expect (homePage.getByText(name[x])).toHaveCSS("color", "rgb(255, 255, 255)")
  }
  });

  test("the ul link font size will be 16px", async({page}) =>{
    let name:string = ["Home", "Submit", "Search", "About"]
    for (let x:number = 0; x < 4; x++) {
    await expect (homePage.getByText(name[x])).toHaveCSS("color", "rgb(255, 255, 255)")
  }
  });

  test("the ul link will transition color when hovered over with mouse", async({page}) =>{
    let name:string = ["Home", "Submit", "Search", "About"]
    for (let x:number = 0; x < 4; x++) {
      await homePage.getByText(name[x]).hover()
      await expect(homePage.getByText(name[x])).toHaveCSS("color", "rgb(50, 205, 50)")
    }
  });

  //
  // AFTER ALL TEARDOWN
  //
 
  test.afterAll(async () => {
    await sharedContext.close();
  });
});

