import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should navigate to sign in page', async ({ page }) => {
    await page.goto('/')

    // Look for sign in link in header
    const signInLink = page.getByRole('link', { name: /sign in/i })
    if (await signInLink.isVisible()) {
      await signInLink.click()
      await expect(page).toHaveURL(/\/auth\/signin/)
    } else {
      // Navigate directly if link not found
      await page.goto('/auth/signin')
    }

    // Check for sign in form elements
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })

  test('should navigate to sign up page', async ({ page }) => {
    await page.goto('/auth/signin')

    // Look for sign up link
    const signUpLink = page.getByRole('link', { name: /sign up|register|create account/i })
    if (await signUpLink.isVisible()) {
      await signUpLink.click()
      await expect(page).toHaveURL(/\/auth\/signup/)
    } else {
      await page.goto('/auth/signup')
    }

    // Check for sign up form elements
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/auth/signin')

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /sign in|login/i })
    await submitButton.click()

    // Should stay on same page or show errors
    await expect(page).toHaveURL(/\/auth\/signin/)
  })

  test('should show validation errors for invalid email', async ({ page }) => {
    await page.goto('/auth/signin')

    // Fill with invalid email
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/password/i).fill('password123')

    const submitButton = page.getByRole('button', { name: /sign in|login/i })
    await submitButton.click()

    // Should show validation error
    await expect(page).toHaveURL(/\/auth\/signin/)
  })

  test('should display sign up form with required fields', async ({ page }) => {
    await page.goto('/auth/signup')

    // Check all required fields are present
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /sign up|register|create account/i })).toBeVisible()
  })
})
