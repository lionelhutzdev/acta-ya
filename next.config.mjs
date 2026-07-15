import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  webpack: { treeshake: { removeDebugLogging: true } },
  // Only upload source maps / annotate when an auth token is present
  // (e.g. local dev without Sentry configured builds unaffected).
  sourcemaps: { disable: !process.env.SENTRY_AUTH_TOKEN },
})
