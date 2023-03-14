import { expect, Locator, Page } from '@playwright/test'

export class BuyPage {
  readonly page: Page
  readonly shoppingCartCounter: Locator
  readonly shoppingCart: Locator
  readonly onesieAddToCart: Locator
  readonly backpackAddToCart: Locator
  readonly backpackRemoveFromCart: Locator

  constructor(page: Page) {
    this.page = page
    this.shoppingCart = page.locator('#shopping_cart_container')
    this.shoppingCartCounter = page.locator('.shopping_cart_badge')
    this.onesieAddToCart = page.locator('#add-to-cart-sauce-labs-onesie')
    this.backpackAddToCart = page.locator('#add-to-cart-sauce-labs-backpack')
    this.backpackRemoveFromCart = page.locator('#remove-sauce-labs-backpack')
  }

  async addOnesieToCart() {
    await this.page.keyboard.down('PageDown')
    await this.onesieAddToCart.click()
    await expect(this.shoppingCartCounter).toContainText('1')
  }

  async goToCart() {
    await this.shoppingCart.click()
  }

  async addBackpackToCart() {
    await this.backpackAddToCart.click()
    await expect(this.shoppingCartCounter).toContainText('1')
  }

  async removeBackpackFromCart() {
    await this.backpackRemoveFromCart.click()
    await expect(this.shoppingCartCounter).toBeHidden()
  }
}