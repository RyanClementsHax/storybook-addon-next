const path = require('path')

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next'
  ],
  core: {
    builder: 'webpack5'
  },
  /**
   * @param {WebpackConfig} baseConfig
   * @return {Promise<WebpackConfig>}
   */
  async webpackFinal(baseConfig) {
    const nextConfig = await import(path.resolve('next.config.js'))
    const nextConfigResolved =
      typeof nextConfig === 'function' ? nextConfig([], baseConfig) : nextConfig

    configureCss(baseConfig, nextConfigResolved)
    console.log(baseConfig.module?.rules)

    return baseConfig
  }
}

/**
 * @param {WebpackConfig} baseConfig
 * @param {NextConfig} nextConfig
 * @return {void}
 */
const configureCss = (baseConfig, nextConfig) =>
  void baseConfig.module?.rules?.push({
    test: /\.(s*)css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: { auto: true }
        }
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          additionalData: nextConfig.sassOptions?.prependData
        }
      }
    ]
  })
