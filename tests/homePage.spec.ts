import { test, expect, type Page, type BrowserContext, Locator } from '@playwright/test';

let sharedContext: BrowserContext;
let homePage: Page;
let title: string = "Home Page"
let homeURL: string = "/"
let aboutURL: string = "/about"
let searchURL: string = "/search"
let submitURL: string = "/submit"


test.describe('Basic tests for Home page', () => {

  test.describe.configure({ mode: 'parallel' }); 

  test.beforeEach(async ({ browser }) => {
    sharedContext = await browser.newContext();
    homePage = await sharedContext.newPage();
    
    await homePage.goto(homeURL);
  });

  /*
   check for the presence of the main page elements:
    - check that the main page exists and the root is present
    - check that the main page has the title "Red Green Refactor"
    - check that the main page has html semantic element <main>
    - check that the main page will have a <nav> element within <header>
  */
  test('main page exists and root is present"', async({page})=>{
    await expect(homePage).toHaveURL(homeURL)
  })

  test('main page has the title "Red Green Refactor"', async ({ page }) => {
    await expect(homePage).toHaveTitle(title);
  });

  test('main page has html semantic element <main>', async({page})=>{
    await expect(homePage.locator('main')).toBeAttached();
  })

  test('main page will have a <nav> element within <header>', async({page}) =>{
    await expect(homePage.locator('header').filter({ has: homePage.locator('nav') })).toBeAttached();
  })

  /*
    check for the presence of the main page navigation elements:
    - check that the main page will have a node Home
    - check that the main page will have a node About
    - check that the main page will have a node Search
    - check that the main page will have a node Submit
  */

  test('the nav will have Node Home', async({page})=>{
    await expect(homePage.getByRole('link', {name: 'Home'})).toBeVisible();
  })


  test('the nav will have node About', async({page})=>{
    await expect(homePage.getByRole('link', {name: 'About'})).toBeVisible();
  })

   test('the nav will have Node Search', async({page})=>{
    await expect(homePage.getByRole('link', {name: 'Search'})).toBeVisible();
  })

  test('the nav will have a node Submit', async ({page})=>{
    await expect (homePage.getByRole('link', {name: 'Submit'})).toBeVisible();
  })

  /* 
  check that the main page navigation elements will take the user to the correct page:
  - check that the Home node will take the user to the home page
  - check that the About node will take the user to the about page
  - check that the Search node will take the user to the search page
  - check that the Submit node will take the user to the submit page
  */

  test('Home can be selected and takes the user to the home page', async({page})=>{
    await homePage.getByRole('link', {name: 'Home'}).click()
    await expect(homePage).toHaveURL(homeURL)
  })

  test('About can be selected and takes the user to the about page', async({page})=>{
    await homePage.getByRole('link', {name: 'About'}).click()
    await expect(homePage).toHaveURL(aboutURL)
  })

  test('Search can be selected and takes the user to the search page', async({page})=>{
    await homePage.getByRole('link', {name: 'Search'}).click()
    await expect(homePage).toHaveURL(searchURL)
  })

  test('Submit can be selected and takes the user to the submit page', async({page})=>{
    await homePage.getByRole('link', {name: 'Submit'}).click()
    await expect(homePage).toHaveURL(submitURL)
  })

  test.afterAll(async () => {
    await sharedContext.close();
  });
})

