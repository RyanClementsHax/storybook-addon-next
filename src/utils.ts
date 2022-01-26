import path from 'path'
import { Configuration as WebpackConfig } from 'webpack'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import { NextConfig } from 'next'

export const getNextjsVersion = (): string =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require(path.resolve('node_modules/next/package.json')).version

export const resolveNextConfig = async (
  baseConfig: WebpackConfig
): Promise<NextConfig> => {
  const nextConfigExport = await import(path.resolve('next.config.js'))
  return typeof nextConfigExport === 'function'
    ? nextConfigExport(PHASE_DEVELOPMENT_SERVER, { defaultConfig: baseConfig })
    : nextConfigExport
}

// This is to help the addon in development
// Without it, the addon resolves packages in its node_modules instead of the example's node_modules
export const addScopedAlias = (
  baseConfig: WebpackConfig,
  name: string,
  alias?: string
): void => {
  if (!baseConfig.resolve) baseConfig.resolve = {}
  if (!baseConfig.resolve.alias) baseConfig.resolve.alias = {}
  const aliasConfig = baseConfig.resolve.alias

  const scopedAlias = path.resolve(`node_modules/${alias ?? name}`)
  if (Array.isArray(aliasConfig)) {
    aliasConfig.push({
      name,
      alias: scopedAlias
    })
  } else {
    aliasConfig[name] = scopedAlias
  }
}
