import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { loadConfig } from 'tsconfig-paths'
import { Configuration as WebpackConfig } from 'webpack'

export const configureImports = (baseConfig: WebpackConfig): void => {
  const configLoadResult = loadConfig()

  if (
    configLoadResult.resultType === 'failed' ||
    // in development, the call to loadConfig() will load this addon's tsconfig lol
    configLoadResult.absoluteBaseUrl.endsWith('storybook-addon-next')
  ) {
    return
  }

  baseConfig.resolve ??= {}
  baseConfig.resolve.plugins ??= []

  baseConfig.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: configLoadResult.configFileAbsolutePath,
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  )
}
