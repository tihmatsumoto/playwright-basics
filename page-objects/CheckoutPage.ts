import { expect, Locator, Page } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly postalCodeInput: Locator
  readonly continueButton: Locator
  readonly subTotalField: Locator
  readonly taxField: Locator
  readonly cartTotal: Locator
  readonly finishButton: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameInput = page.locator('#first-name')
    this.lastNameInput = page.locator('#last-name')
    this.postalCodeInput = page.locator('#postal-code')
    this.continueButton = page.locator('#continue')
    this.subTotalField = page.locator('.summary_subtotal_label')
    this.taxField = page.locator('.summary_tax_label')
    this.cartTotal = page.locator('.summary_total_label')
    this.finishButton = page.locator('#finish')
    this.successMessage = page.locator('.complete-header')
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.type(firstName)
    await this.lastNameInput.type(lastName)
    await this.postalCodeInput.type(postalCode)
    await this.continueButton.click()
  }

  async assertCheckoutPrices(itemTotal: string, taxTotal: string, cartTotal: string) {
    await expect(this.subTotalField).toContainText(`Item total: ${itemTotal}`)
    await expect(this.taxField).toContainText(`Tax: ${taxTotal}`)
    await expect(this.cartTotal).toContainText(`Total: ${cartTotal}`)
  }

  async completeOrder() {
    await this.finishButton.click()
    await expect(this.successMessage).toHaveText('Thank you for your order!')
  }
}