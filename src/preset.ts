// https://storybook.js.org/docs/react/addons/writing-presets

import path from 'path'
import { NextConfig } from 'next'
import { Configuration as WebpackConfig } from 'webpack'
import { StorybookConfig } from '@storybook/core-common'

export const config: StorybookConfig['config'] = (entry = []) => [
  ...entry,
  require.resolve('./preview')
]

export const managerEntries = (entry: string[] = []): string[] => [
  ...entry,
  require.resolve('./register')
]

export const webpackFinal: StorybookConfig['webpackFinal'] =
  async baseConfig => {
    const nextConfig = await import(path.resolve('next.config.js'))
    const nextConfigResolved: NextConfig =
      typeof nextConfig === 'function' ? nextConfig([], baseConfig) : nextConfig

    configureRootAbsoluteImport(baseConfig)
    configureCss(baseConfig, nextConfigResolved)
    configureStaticImageImport(baseConfig)
    configureModuleAliases(baseConfig)

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
            loader: path.resolve(__dirname, './webpack/next-image-loader-stub'),
            options: {
              filename: rule.generator?.filename
            }
          }
        ]
      }
    }
  })
}

// This is to help the addon in development
// Without it, the addon resolves packages in its node_modules instead of the example's node_modules
const configureModuleAliases = (baseConfig: WebpackConfig): void => {
  if (!baseConfig.resolve) baseConfig.resolve = {}
  if (!baseConfig.resolve.alias) baseConfig.resolve.alias = {}

  const aliasConfig = baseConfig.resolve.alias
  const names = ['next/image', 'next/dist/shared/lib/router-context']
  for (const name of names) {
    const alias = path.resolve(`node_modules/${name}`)
    if (Array.isArray(aliasConfig)) {
      aliasConfig.push({
        name,
        alias
      })
    } else {
      aliasConfig[name] = alias
    }
  }
}
