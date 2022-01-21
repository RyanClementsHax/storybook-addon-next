import path from 'path'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import { NextConfig } from 'next'
import { Configuration as WebpackConfig } from 'webpack'
import { StorybookConfig } from '@storybook/core-common'

export const webpackFinal: StorybookConfig['webpackFinal'] =
  async baseConfig => {
    const nextConfig = await resolveNextConfig(baseConfig)

    configureRootAbsoluteImport(baseConfig)
    configureCss(baseConfig, nextConfig)
    configureStaticImageImport(baseConfig)
    configureModuleAliases(baseConfig)

    return baseConfig
  }

const resolveNextConfig = async (
  baseConfig: WebpackConfig
): Promise<NextConfig> => {
  const nextConfigExport = await import(path.resolve('next.config.js'))
  return typeof nextConfigExport === 'function'
    ? nextConfigExport(PHASE_DEVELOPMENT_SERVER, { defaultConfig: baseConfig })
    : nextConfigExport
}

const configureRootAbsoluteImport = (baseConfig: WebpackConfig): void =>
  void baseConfig.resolve?.modules?.push(path.resolve())

const configureCss = (
  baseConfig: WebpackConfig,
  nextConfig: NextConfig
): void => {
  const rules = baseConfig.module?.rules
  rules?.forEach((rule, i) => {
    if (
      typeof rule !== 'string' &&
      rule.test instanceof RegExp &&
      rule.test.test('test.css')
    ) {
      rules[i] = {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { auto: true }
            }
          },
          'postcss-loader'
        ]
      }
    }
  })
  rules?.push({
    test: /\.(scss|sass)$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: { auto: true }
        }
      },
      'postcss-loader',
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: nextConfig.sassOptions,
          additionalData:
            nextConfig.sassOptions?.prependData ||
            nextConfig.sassOptions?.additionalData
        }
      }
    ]
  })
}

const configureStaticImageImport = (baseConfig: WebpackConfig): void => {
  const rules = baseConfig.module?.rules
  rules?.forEach((rule, i) => {
    if (
      typeof rule !== 'string' &&
      rule.test instanceof RegExp &&
      rule.test.test('test.jpg')
    ) {
      rules[i] = {
        test: rule.test,
        use: [
          {
            loader: path.resolve(__dirname, './next-image-loader-stub'),
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
