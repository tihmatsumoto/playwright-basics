import {test, expect} from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers/page'

test("Simple basic test @initial", async ({page}) => {
  //Here goes test code
  await page.goto("https://www.example.com")
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test.describe.parallel("Test suite", () => {
  test("Clicking on Elements", async ({page}) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.click("text=Sign in")
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test("Working with Inputs", async ({page}) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.type('#user_login', "some username")
    await page.type('#user_password', "some password")
    await page.click("text=Sign in")
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test("Assertions", async ({page}) => {
    await page.goto("https://example.com")
    await expect(page).toHaveURL("https://example.com")
    await expect(page).toHaveTitle("Example Domain")
  
    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText("Example Domain")
    await expect(element).toHaveCount(1)
  
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })

})

/* selector that can be used */
test.skip("Selectors", async ({page}) => {
  // text
  await page.click('text=some text')

  // css selector
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  // visible css selector
  await page.click('.submit-button:visible')

  // combination 
  await page.click('#username .first')

  // Xpath
  await page.click('//button')
})

test.describe.skip("Hooks", () => {
  test.beforeEach(async ({page}) => {
    await loadHomepage(page)
  })

  test("Screenshot", async({page}) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })
  
  test("Single element screenshot", async({page}) => {
    const element = await page.$('h1')
    await element?.screenshot({path: 'single-element-ss.png'})
  })
})