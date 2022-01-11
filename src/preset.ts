// https://storybook.js.org/docs/react/addons/writing-presets

import path from 'path'
import { NextConfig } from 'next'
import { Configuration as WebpackConfig } from 'webpack'

console.log(require.resolve('./preview'))

// export const addons = ['storybook-addon-next-router']

export const config = (entry: string[] = []): string[] => [
  ...entry,
  require.resolve('./preview')
]

export const managerEntries = (entry: string[] = []): string[] => [
  ...entry,
  require.resolve('./register')
]

export const webpackFinal = async (
  baseConfig: WebpackConfig
): Promise<WebpackConfig> => {
  // check
  const nextConfig = await import(
    path.resolve(path.resolve(), 'next.config.js')
  )
  const nextConfigResolved: NextConfig =
    typeof nextConfig === 'function' ? nextConfig([], baseConfig) : nextConfig

  configureRootAbsoluteImport(baseConfig)
  // configureCss(baseConfig, nextConfigResolved)
  configureStaticImageImport(baseConfig)

  console.log(baseConfig.module?.rules as any)

  return baseConfig
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
