// https://storybook.js.org/docs/react/addons/writing-presets

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

module.exports = {
  addons: ['storybook-addon-next-router'],
  /**
   * @param {string[]} entry
   * @return {string[]}
   */
  config: (entry = []) => [...entry, require.resolve('./preview')],
  /**
   * @param {WebpackConfig} baseConfig
   * @return {WebpackConfig}
   */
  webpackFinal: baseConfig => {
    const nextConfig = require('../../next.config.js')([], baseConfig)

    configureRootAbsoluteImport(baseConfig)
    configureCss(baseConfig, nextConfig)
    configureStaticImageImport(baseConfig)

    return baseConfig
  }
}

/**
 * @param {WebpackConfig} baseConfig
 * @return {void}
 */
const configureRootAbsoluteImport = baseConfig =>
  void baseConfig.resolve?.modules?.push(path.resolve())

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

/**
 * @param {WebpackConfig} baseConfig
 * @return {void}
 */
const configureStaticImageImport = baseConfig => {
  if (!baseConfig.module) baseConfig.module = {}
  if (!baseConfig.module.rules) baseConfig.module.rules = []

  const rules = baseConfig.module.rules
  rules.forEach((rule, i) => {
    if (
      typeof rule !== 'string' &&
      rule.test instanceof RegExp &&
      rule.test.test('test.jpg')
    ) {
      rules[i] = {
        test: rule.test,
        use: [
          {
            loader: path.resolve(__dirname, 'next-image-loader-stub'),
            options: {
              filename: rule.generator?.filename
            }
          }
        ]
      }
    }
  })
}
