import { test, expect, type Page, type BrowserContext, Locator } from '@playwright/test';

let sharedContext: BrowserContext;
let aboutPage: Page;
let title: string = "About RGR"
let aboutURL: string = "/about"

test.describe('Basic tests for About page', () => {

  test.describe.configure({ mode: 'parallel' }); 

  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext();
    aboutPage = await sharedContext.newPage();
    
    await aboutPage.goto(aboutURL);
  });
  
  test('main page exists and root is present"', async({page})=>{
    await expect(aboutPage).toHaveURL(aboutURL)
  });

  test('about page has the title "About RGR"', async ({ page }) => {
    await expect(aboutPage).toHaveTitle(title);
  });

  test.afterAll(async () => {
    await sharedContext.close();
  });
})