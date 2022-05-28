import { TransformOptions, loadPartialConfigAsync } from '@babel/core'

export const configureStyledJsxTransforms = async (
  config: TransformOptions
): Promise<TransformOptions> =>
  (await hasCustomBabelFile())
    ? // the babel loader will pick up the custom
      // config file
      config
    : {
        ...config,
        plugins: [...(config.plugins ?? []), 'styled-jsx/babel']
      }

const hasCustomBabelFile = async () => {
  const config = await loadPartialConfigAsync({
    // in order to load babel config, we need to give babel a file
    // we just choose the project's package.json cuz we know it has
    // to be present
    // filename is resolved relative to the root (defaulted to process.cwd())
    // https://babeljs.io/docs/en/options#filename
    filename: './package.json'
  })
  return config?.babelrc || config?.config
}
