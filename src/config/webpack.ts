import { Configuration as WebpackConfig } from 'webpack'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import path from 'path'
import { NextConfig } from 'next'
import { DefinePlugin } from 'webpack'
import { addScopedAlias } from '../utils'

export const configureConfig = async (
  baseConfig: WebpackConfig,
  nextConfigPath?: string
): Promise<NextConfig> => {
  const nextConfig = await resolveNextConfig(baseConfig, nextConfigPath)

  addScopedAlias(baseConfig, 'next/config')
  setupRuntimeConfig(baseConfig, nextConfig)

  return nextConfig
}

const resolveNextConfig = async (
  baseConfig: WebpackConfig,
  nextConfigPath?: string
): Promise<NextConfig> => {
  const nextConfigExport = await import(
    nextConfigPath ? nextConfigPath : path.resolve('next.config.js')
  )

  const nextConfig =
    typeof nextConfigExport === 'function'
      ? nextConfigExport(PHASE_DEVELOPMENT_SERVER, {
          defaultConfig: baseConfig
        })
      : nextConfigExport

  return nextConfig
}

const setupRuntimeConfig = (
  baseConfig: WebpackConfig,
  nextConfig: NextConfig
): void =>
  void baseConfig.plugins?.push(
    new DefinePlugin({
      // this mimics what nextjs does client side
      // https://github.com/vercel/next.js/blob/57702cb2a9a9dba4b552e0007c16449cf36cfb44/packages/next/client/index.tsx#L101
      'process.env.__NEXT_RUNTIME_CONFIG': JSON.stringify({
        serverRuntimeConfig: {},
        publicRuntimeConfig: nextConfig.publicRuntimeConfig
      })
    })
  )
