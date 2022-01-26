import { TransformOptions } from '@babel/core'

export const configureStyledJsxTransforms = (
  config: TransformOptions
): TransformOptions => ({
  ...config,
  plugins: [...(config.plugins ?? []), 'styled-jsx/babel']
})
