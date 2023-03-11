import { test, expect } from '@playwright/test'

test.describe.parallel("Login/Logout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
  })

  test("Failed to log in with wrong username and password", async ({page}) => {
    await page.click("#signin_button")
    await page.type('#user_login', 'fail user')
    await page.type('#user_password', 'fail password')
    await page.click("text=Sign in")
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test("Failed to log in without adding input", async ({page}) => {
    await page.click("#signin_button")
    await page.click("text=Sign in")
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test("Failed to log in with correct username and wrong password", async ({page}) => {
    await page.click("#signin_button")
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'fail password')
    await page.click("text=Sign in")
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test("Login to Zero Bank", async ({ page }) => {
    await page.click("#signin_button")
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'fail password')
    await page.click("text=Sign in")
    const accountSumaryTab = await page.locator('#account_sumary_tab')
    await expect(accountSumaryTab).toBeVisible()
  })
})