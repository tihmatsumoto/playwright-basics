import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel("Login/Logout", () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.visit()
  })

  test('Fail to log in with wrong username and password', async ({ page }) => {
    await loginPage.login('fail user', 'fail password')
    await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service')
  })

  test('Fail to log in with locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce')
    await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.')
  })

  test("Login to Sauce Demo Store", async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  })
})