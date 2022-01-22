// https://storybook.js.org/docs/react/addons/writing-presets

import { StorybookConfig } from '@storybook/core-common'
import { TransformOptions } from '@babel/core'

export const config: StorybookConfig['config'] = (entry = []) => [
  ...entry,
  require.resolve('./preview')
]

export const managerEntries = (entry: string[] = []): string[] => [
  ...entry,
  require.resolve('./register')
]

export const babel = (config: TransformOptions): TransformOptions => ({
  ...config,
  plugins: [...(config.plugins ?? []), 'styled-jsx/babel']
})

export { webpackFinal } from './webpack/webpackFinal'
