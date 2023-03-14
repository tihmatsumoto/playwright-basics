import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { BuyPage } from '../../page-objects/BuyPage'
import { CartPage } from '../../page-objects/CartPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'

test.describe.parallel('Buy/Cart Flow', () => {
  let loginPage: LoginPage
  let buyPage: BuyPage
  let cartPage: CartPage
  let checkoutPage: CheckoutPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.visit()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('Buy Sauce Labs Onesie', async ({ page }) => {
    buyPage = new BuyPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)

    await expect(buyPage.shoppingCartCounter).toBeHidden()
    await buyPage.addOnesieToCart()
    await buyPage.goToCart()
    await cartPage.assertName('Sauce Labs Onesie')
    await cartPage.assertPrice('$7.99')
    await cartPage.goToCheckout()
    await checkoutPage.fillCheckoutInfo('Playwright', 'Test', '3700')
    await checkoutPage.assertCheckoutPrices('$7.99', '$0.64', '$8.63')
    await checkoutPage.completeOrder()
  })

  test('Remove item from cart', async ({ page }) => {
    buyPage = new BuyPage(page)

    await expect(buyPage.shoppingCartCounter).toBeHidden()
    await buyPage.addBackpackToCart()
    await buyPage.removeBackpackFromCart()
  })
})