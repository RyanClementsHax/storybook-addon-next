// https://storybook.js.org/docs/react/addons/writing-presets

import path from 'path'
import { NextConfig } from 'next'
import { Configuration as WebpackConfig } from 'webpack'

export default {
  addons: ['storybook-addon-next-router'],
  config: (entry: string[] = []): string[] => [
    ...entry,
    require.resolve('./preview')
  ],
  async webpackFinal(baseConfig: WebpackConfig): Promise<WebpackConfig> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const nextConfig = await import('./next.config.js')
    const nextConfigResolved: NextConfig = nextConfig([], baseConfig)

    configureRootAbsoluteImport(baseConfig)
    configureCss(baseConfig, nextConfigResolved)
    configureStaticImageImport(baseConfig)

    return baseConfig
  }
}

const configureRootAbsoluteImport = (baseConfig: WebpackConfig): void =>
  void baseConfig.resolve?.modules?.push(path.resolve())

const configureCss = (
  baseConfig: WebpackConfig,
  nextConfig: NextConfig
): void =>
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

const configureStaticImageImport = (baseConfig: WebpackConfig): void => {
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
