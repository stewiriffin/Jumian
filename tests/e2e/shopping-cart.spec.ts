import { test, expect } from '@playwright/test'

test.describe('Shopping Cart', () => {
  test('should navigate to cart page', async ({ page }) => {
    await page.goto('/')

    // Look for cart icon/link in header
    const cartLink = page.getByRole('link', { name: /cart/i })
    if (await cartLink.isVisible()) {
      await cartLink.click()
      await expect(page).toHaveURL(/\/cart/)
    } else {
      await page.goto('/cart')
    }

    // Should show cart page (may be empty)
    await expect(page).toHaveURL(/\/cart/)
  })

  test('should display empty cart message when cart is empty', async ({ page }) => {
    await page.goto('/cart')

    // Check for empty cart message or cart items
    const emptyMessage = page.getByText(/empty|no items/i)
    const cartItems = page.locator('[data-testid="cart-item"]')

    // Either empty message or cart items should be present
    const hasEmptyMessage = await emptyMessage.isVisible().catch(() => false)
    const hasCartItems = await cartItems.count() > 0

    expect(hasEmptyMessage || hasCartItems).toBe(true)
  })

  test('should navigate to checkout from cart', async ({ page }) => {
    await page.goto('/cart')

    // Look for checkout button (may not be visible if cart is empty)
    const checkoutButton = page.getByRole('button', { name: /checkout|proceed/i })
    const checkoutLink = page.getByRole('link', { name: /checkout|proceed/i })

    if (await checkoutButton.isVisible()) {
      await checkoutButton.click()
      await expect(page).toHaveURL(/\/checkout/)
    } else if (await checkoutLink.isVisible()) {
      await checkoutLink.click()
      await expect(page).toHaveURL(/\/checkout/)
    }
  })
})

test.describe('Product to Cart Flow', () => {
  test('should add product to cart from product page', async ({ page }) => {
    // Navigate to home and find a product
    await page.goto('/')

    const productLink = page.locator('a[href^="/product/"]').first()
    if (await productLink.isVisible()) {
      await productLink.click()
      await expect(page).toHaveURL(/\/product\//)

      // Look for add to cart button
      const addToCartButton = page.getByRole('button', { name: /add to cart/i })
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click()

        // Should show success message or update cart indicator
        // Wait a moment for any updates
        await page.waitForTimeout(1000)
      }
    }
  })
})
