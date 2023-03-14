import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  //Init selector using constructor
  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('#login-button')
    this.errorMessage = page.locator('.error-message-container')
  }

  //Define login page methods
  async visit() {
    await this.page.goto("https://www.saucedemo.com/")
  }

  async login(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.loginButton.click()
  }

  async assertErrorMessage(message) {
    await expect(this.errorMessage).toContainText(message)
  }
}