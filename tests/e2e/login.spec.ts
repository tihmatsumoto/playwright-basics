import { test, expect } from '@playwright/test'

test.describe.parallel("Login/Logout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/")
  })

  test('Fail to log in with wrong username and password', async ({ page }) => {
    await page.type('#user-name', 'fail user')
    await page.type('#password', 'fail password')
    await page.click('#login-button')
    const errorMessage = await page.locator('.error-message-container')
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service')
  })

  test('Fail to log in with locked out user', async ({ page }) => {
    await page.type('#user-name', 'locked_out_user')
    await page.type('#password', 'secret_sauce')
    await page.click('#login-button')
    const errorMessage = await page.locator('.error-message-container')
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.')
  })

  test("Login to Sauce Demo Store", async ({ page }) => {
    await page.type('#user-name', 'standard_user')
    await page.type('#password', 'secret_sauce')
    await page.click('#login-button')
    const backpackProductTitle = await page.locator('#item_4_title_link')
    expect(backpackProductTitle).toHaveText('Sauce Labs Backpack')
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  })
})