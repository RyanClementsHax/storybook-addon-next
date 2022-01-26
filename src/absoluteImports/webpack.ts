import path from 'path'
import { Configuration as WebpackConfig } from 'webpack'

export const configureAbsoluteImports = (baseConfig: WebpackConfig): void =>
  void baseConfig.resolve?.modules?.push(path.resolve())
