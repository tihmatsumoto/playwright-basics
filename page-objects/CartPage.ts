import { expect, Locator, Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartItemName: Locator
  readonly cartItemPrice: Locator
  readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.cartItemName = page.locator('.inventory_item_name')
    this.cartItemPrice = page.locator('.inventory_item_price')
    this.checkoutButton = page.locator('#checkout')
  }

  async assertName(itemName: string) {
    await expect(this.cartItemName).toContainText(itemName)
  }

  async assertPrice(itemPrice: string) {
    await expect(this.cartItemPrice).toContainText(itemPrice)
  }

  async goToCheckout() {
    await this.checkoutButton.click()
  }
}