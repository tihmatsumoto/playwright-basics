import { test, expect } from '@playwright/test'

test.describe.parallel('Buy/Cart Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/")
    await page.type('#user-name', 'standard_user')
    await page.type('#password', 'secret_sauce')
    await page.click('#login-button')
  })

  test('Buy Sauce Labs Onesie', async ({ page }) => {
    const shoppingCartCounter = page.locator('.shopping_cart_badge')
    await expect(shoppingCartCounter).toBeHidden()
    await page.keyboard.down('PageDown');
    await page.click("#add-to-cart-sauce-labs-onesie")
    await expect(shoppingCartCounter).toHaveText('1')
    await page.click('#shopping_cart_container')
    const cartItemName = page.locator('.inventory_item_name')
    await expect(cartItemName).toHaveText('Sauce Labs Onesie')
    const cartItemPrice = page.locator('.inventory_item_price')
    await expect(cartItemPrice).toHaveText('$7.99')
    await page.click('#checkout')
    await page.type('#first-name', 'Playwright')
    await page.type('#last-name', 'Test')
    await page.type('#postal-code', '3700')
    await page.click('#continue')
    const subTotal = page.locator('.summary_subtotal_label')
    await expect(subTotal).toHaveText('Item total: $7.99')
    const taxTotal = page.locator('.summary_tax_label')
    await expect(taxTotal).toHaveText('Tax: $0.64')
    const cartTotal = page.locator('.summary_total_label')
    await expect(cartTotal).toHaveText('Total: $8.63')
    await page.click('#finish')
    const successMessage = page.locator('.complete-header')
    await expect(successMessage).toHaveText('Thank you for your order!')
  })

  test('Remove item from cart', async ({ page }) => {
    const shoppingCartCounter = page.locator('.shopping_cart_badge')
    await expect(shoppingCartCounter).toBeHidden()
    await page.click("#add-to-cart-sauce-labs-backpack")
    await expect(shoppingCartCounter).toHaveText('1')
    await page.click("#remove-sauce-labs-backpack")
    await expect(shoppingCartCounter).toBeHidden()
  })
})