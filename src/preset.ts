// https://storybook.js.org/docs/react/addons/writing-presets

import { StorybookConfig } from '@storybook/core-common'
import { TransformOptions } from '@babel/core'
import { configureConfig } from './config/webpack'
import { configureCss } from './css/webpack'
import { configureImports } from './imports/webpack'
import { configureRouting } from './routing/webpack'
import { configureStyledJsx } from './styledJsx/webpack'
import { configureStyledJsxTransforms } from './styledJsx/babel'
import { configureImages } from './images/webpack'
import { configureRuntimeNextjsVersionResolution } from './utils'
import { AddonOptions } from './types'

export const config: StorybookConfig['config'] = (entry = []) => [
  ...entry,
  require.resolve('./preview')
]

export const managerEntries = (entry: string[] = []): string[] => [
  ...entry,
  require.resolve('./register')
]

export const babel = async (
  config: TransformOptions
): Promise<TransformOptions> => await configureStyledJsxTransforms(config)

export const webpackFinal: StorybookConfig['webpackFinal'] = async (
  baseConfig,
  options
) => {
  const { nextConfigPath } = options as AddonOptions
  const nextConfig = await configureConfig(baseConfig, nextConfigPath)

  configureRuntimeNextjsVersionResolution(baseConfig)
  configureImports(baseConfig)
  configureCss(baseConfig, nextConfig)
  configureImages(baseConfig)
  configureRouting(baseConfig)
  configureStyledJsx(baseConfig)

  return baseConfig
}
