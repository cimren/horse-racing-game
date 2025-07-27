import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Horse Racing')
})

test.describe('Horse Race Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should schedule a race and start the first round', async ({ page }) => {
    //Click on the button "Generate Program"
    await page.getByRole('button', { name: 'GENERATE PROGRAM' }).click()

    // Check if the race area is visible
    await expect(page.getByText('Race scheduled. Click START to begin.')).toBeVisible()

    // Check if the horses are displayed
    const horses = page.locator('.track')
    await expect(horses).toHaveCount(10)
  })

  test('should start and pause race', async ({ page }) => {
    // Click on the Start / Pause button
    await page.getByRole('button', { name: 'GENERATE PROGRAM' }).click()
    await page.getByRole('button', { name: 'START / PAUSE' }).click()
    await page.getByRole('button', { name: 'START / PAUSE' }).click()
    await expect(page.getByText('Race paused. Click START to continue.')).toBeVisible()
  })
})
