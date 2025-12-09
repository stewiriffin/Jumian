import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Jumian/i)
  })

  test('should display header with logo and navigation', async ({ page }) => {
    // Check for header
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check for navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    // Check for hero section with main heading
    const hero = page.locator('h1')
    await expect(hero).toBeVisible()
    await expect(hero).toContainText(/shop/i)
  })

  test('should display featured products section', async ({ page }) => {
    // Check for products section
    const featuredHeading = page.getByText(/featured products/i)
    await expect(featuredHeading).toBeVisible()
  })

  test('should display categories section', async ({ page }) => {
    // Check for categories
    const categoriesHeading = page.getByText(/shop by category/i)
    await expect(categoriesHeading).toBeVisible()
  })

  test('should navigate to category page when clicking category', async ({ page }) => {
    // Find and click on a category link
    const categoryLink = page.locator('a[href^="/category/"]').first()
    if (await categoryLink.isVisible()) {
      await categoryLink.click()
      await expect(page).toHaveURL(/\/category\//)
    }
  })

  test('should navigate to product page when clicking product', async ({ page }) => {
    // Find and click on a product link
    const productLink = page.locator('a[href^="/product/"]').first()
    if (await productLink.isVisible()) {
      await productLink.click()
      await expect(page).toHaveURL(/\/product\//)
    }
  })
})
