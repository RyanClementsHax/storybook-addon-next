import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { Configuration as WebpackConfig } from 'webpack'

export const configureImports = (baseConfig: WebpackConfig): void => {
  baseConfig.resolve = baseConfig.resolve ?? {}

  const plugin = new TsconfigPathsPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })

  if (baseConfig.resolve.plugins) {
    baseConfig.resolve.plugins.push(plugin)
  } else {
    baseConfig.resolve.plugins = [plugin]
  }
}
