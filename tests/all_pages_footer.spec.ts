import { test, expect, type Page, type BrowserContext, Locator } from "@playwright/test";

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page";
let homeURL: string = "/";
let aboutURL: string = "/about";
let searchURL: string = "/search";
let submitURL: string = "/submit";
let urls:string[] =["/", "/about","/search","/submit"]

test.describe("Basic tests for index page footer", () => {

  test.describe.configure({ mode: "parallel" });
//
// BEFORE EACH SETUP
//

  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    homePage = await sharedContext.newPage();
  });

// 
// TESTS 
//
for (const url in urls)  {
    

  test(`Verify the footer is present for ${url}`, async ({ page }) => {
    await homePage.goto(url);
    await expect(homePage.locator("footer")).toBeAttached();
  });

  test(`Verify the copyright symbol is present for ${url}`, async ({ page }) => {
    await homePage.goto(url);
    await expect(homePage.locator("footer")).toContainText("©");
  });

  test(`Verify the company name in the footer for ${url}`, async ({ page }) => {
    await homePage.goto(url);
    await expect(homePage.locator("footer")).toContainText("entransic hypermedia, LLC");
  });

  test(`Verify the year is current for the copyright in the footer for ${url}`, async ({ page }) => {
    await homePage.goto(url);
    await expect(homePage.locator("footer")).toContainText(String(new Date().getFullYear()));
  });

  test(`Verify the text All Rights Reserved is present in the copyright statement in the footer for ${url}`, async ({ page }) => {
    await homePage.goto(url);
    await expect(homePage.locator("footer")).toContainText("All Rights Reserved");
  });

  test(`Verify the footer has the class footer for CSS for ${url}`, async({page})=>{
    await homePage.goto(url);
    await expect(homePage.locator("footer")).toHaveClass('footer')
  })

  test(`the footer bar will have text color #FFF for ${url}`, async({page}) =>{
    await homePage.goto(url);
    await expect (homePage.locator("footer")).toHaveCSS("color", "rgb(255, 255, 255)")
  });

  test(`the footer bar will have background color #333 for ${url}`, async({page}) =>{
    await homePage.goto(url);
    await expect (homePage.locator("footer")).toHaveCSS("background-color", "rgb(51, 51, 51)")
  });

  test(`the footer bar will have padding of 15px and 30px for ${url}`, async({page}) =>{
    await homePage.goto(url);
    await expect (homePage.locator("footer")).toHaveCSS("padding","15px 30px") 
  });

  test(`the footer bar will have ia border radius of 10px for ${url}`, async({page}) =>{
    await homePage.goto(url);
    await expect (homePage.locator("footer")).toHaveCSS("border-radius","10px") 
  });

  test(`the footer bar will have display flex for ${url}`, async({page}) =>{
    await homePage.goto(url);
    await expect (homePage.locator("footer")).toHaveCSS("display","flex") 
  });


//
// AFTER ALL TEARDOWN
//

  test.afterAll(async () => {
    await sharedContext.close();
  });
  }
});

