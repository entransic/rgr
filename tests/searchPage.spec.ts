import { test, expect, type Page, type BrowserContext, Locator } from '@playwright/test';

let sharedContext: BrowserContext;
let searchPage: Page;
let title: string = "Search RGR"
let homeURL: string = "/"
let aboutURL: string = "/about"
let searchURL: string = "/search"
let submitURL: string = "/submit"

test.describe('Basic tests for Search page', () => {

  test.describe.configure({ mode: 'parallel' }); 

  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    searchPage = await sharedContext.newPage();
    
    await searchPage.goto(searchURL);
  });
  
  test('main page exists and root is present"', async({page})=>{
    await expect(searchPage).toHaveURL(searchURL)
  });

  test('search page has the title "Search RGR"', async ({ page }) => {
    await expect(searchPage).toHaveTitle(title);
  });

  test('search page will have a <nav> element within <header>', async({page}) =>{
    await expect(searchPage.locator('header').filter({ has: searchPage.locator('nav') })).toBeAttached();
  })
  
  /* 
   Test the nav is present from the template and has the correct nodes:
   - check that the nav will have a node Home
   - check that the nav will have a node About
   - check that the nav will have a node Search
   - check that the nav will have a node Submit
  */
  test('the nav will have Node Home', async({page})=>{
    await expect(searchPage.getByRole('link', {name: 'Home'})).toBeVisible();
  })

  test('the nav will have node About', async({page})=>{
    await expect(searchPage.getByRole('link', {name: 'About'})).toBeVisible();
  })

  test('the nav will have node Search', async({page})=>{
    await expect(searchPage.getByRole('link', {name: 'Search'})).toBeVisible();
  })

  test('the nav will have node Submit', async({page})=>{
    await expect(searchPage.getByRole('link', {name: 'Submit'})).toBeVisible();
  })

    /* 
    check that the main page navigation elements will take the user to the correct page:
    - check that the Home node will take the user to the home page
    - check that the About node will take the user to the about page
    - check that the Search node will take the user to the search page
    - check that the Submit node will take the user to the submit page
    */
  
    test('Home can be selected and takes the user to the home page', async({page})=>{
      await searchPage.getByRole('link', {name: 'Home'}).click()
      await expect(searchPage).toHaveURL(homeURL)
    })
  
    test('About can be selected and takes the user to the about page', async({page})=>{
      await searchPage.getByRole('link', {name: 'About'}).click()
      await expect(searchPage).toHaveURL(aboutURL)
    })
  
    test('Search can be selected and takes the user to the search page', async({page})=>{
      await searchPage.getByRole('link', {name: 'Search'}).click()
      await expect(searchPage).toHaveURL(searchURL)
    })
  
    test('Submit can be selected and takes the user to the submit page', async({page})=>{
      await searchPage.getByRole('link', {name: 'Submit'}).click()
      await expect(searchPage).toHaveURL(submitURL)
    })

  test.afterAll(async () => {
    await sharedContext.close();
  });
})