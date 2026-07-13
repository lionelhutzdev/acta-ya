import { test, expect } from '@playwright/test'

test('critical path: fill form, accept consent, generate acta', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('Ej: Residencial Los Pinos').fill('Consorcio Smoke Test E2E')
  await page.getByPlaceholder('Ej: Salón de usos múltiples').fill('SUM planta baja')
  await page.locator('input[type="date"]').fill('2026-08-01')
  await page.locator('input[type="time"]').first().fill('18:00')
  await page.getByPlaceholder(/Lectura del acta anterior/).fill('1. Aprobación de presupuesto\n2. Varios')
  await page.getByPlaceholder(/Se aprobó el presupuesto anual/).fill('Se aprobó el presupuesto anual por unanimidad.')

  await page.getByRole('checkbox').check()

  await page.getByRole('button', { name: /Generar acta con IA/ }).click()

  await expect(page.getByText('Acta generada')).toBeVisible({ timeout: 45_000 })
  await expect(page.getByText('Borrador generado por IA.')).toBeVisible()
  await expect(page.locator('pre')).not.toBeEmpty()
})

test('rejects submission without accepting terms', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('Ej: Residencial Los Pinos').fill('Consorcio Sin Consentimiento')
  await page.getByPlaceholder('Ej: Salón de usos múltiples').fill('SUM')
  await page.locator('input[type="date"]').fill('2026-08-01')
  await page.locator('input[type="time"]').first().fill('18:00')
  await page.getByPlaceholder(/Lectura del acta anterior/).fill('1. Varios')
  await page.getByPlaceholder(/Se aprobó el presupuesto anual/).fill('Notas de prueba.')

  await expect(page.getByRole('button', { name: /Generar acta con IA/ })).toBeDisabled()
})
