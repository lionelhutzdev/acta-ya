import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
