import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const getServerUrl = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

const NEXT_PUBLIC_SERVER_URL = getServerUrl()

const nextConfig = {
  // Vercel-ல் sharp மற்றும் db-postgres சரியாகச் செயல்பட இது அவசியமானது
  serverExternalPackages: ['sharp', '@payloadcms/db-postgres'],

  // Vercel பில்டில் sharp நேட்டிவ் பைல்கள் விடுபടாமல் இருக்க pnpm பாதையைச் சேர்த்தல்
  outputFileTracingIncludes: {
    '/admin/**/*': ['./node_modules/.pnpm/sharp*@*/node_modules/sharp/**/*'],
    '/**/*': ['./node_modules/.pnpm/sharp*@*/node_modules/sharp/**/*'],
  },

  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })