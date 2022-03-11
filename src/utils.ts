import path from 'path'
import { Configuration as WebpackConfig, DefinePlugin } from 'webpack'

export const configureRuntimeNextjsVersionResolution = (
  baseConfig: WebpackConfig
): void =>
  void baseConfig.plugins?.push(
    new DefinePlugin({
      'process.env.__NEXT_VERSION': JSON.stringify(getNextjsVersion())
    })
  )

export const getNextjsVersion = (): string =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require(scopedResolve('next/package.json')).version

// This is to help the addon in development
// Without it, webpack resolves packages in its node_modules instead of the example's node_modules
export const addScopedAlias = (
  baseConfig: WebpackConfig,
  name: string,
  alias?: string
): void => {
  if (!baseConfig.resolve) baseConfig.resolve = {}
  if (!baseConfig.resolve.alias) baseConfig.resolve.alias = {}
  const aliasConfig = baseConfig.resolve.alias

  const scopedAlias = scopedResolve(`${alias ?? name}`)

  if (Array.isArray(aliasConfig)) {
    aliasConfig.push({
      name,
      alias: scopedAlias
    })
  } else {
    aliasConfig[name] = scopedAlias
  }
}

/**
 *
 * @param id the module id
 * @returns a path to the module id scoped to the project folder without the main script path at the end
 * @summary
 * This is to help the addon in development.
 * Without it, the addon resolves packages in its node_modules instead of the example's node_modules.
 * Because require.resolve will also include the main script as part of the path, this function strips
 * that to just include the path to the module folder
 * @example
 * // before main script path truncation
 * require.resolve('styled-jsx') === '/some/path/node_modules/styled-jsx/index.js
 * // after main script path truncation
 * scopedResolve('styled-jsx') === '/some/path/node_modules/styled-jsx'
 */
export const scopedResolve = (id: string): string => {
  const scopedModulePath = require.resolve(id, { paths: [path.resolve()] })
  const moduleFolderStrPosition = scopedModulePath.lastIndexOf(
    id.replace(/\//g /* all '/' occurances */, path.sep)
  )
  const beginningOfMainScriptPath = moduleFolderStrPosition + id.length
  return scopedModulePath.substring(0, beginningOfMainScriptPath)
}
