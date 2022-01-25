import path from 'path'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import { NextConfig } from 'next'
import { Configuration as WebpackConfig } from 'webpack'
import semver from 'semver'

export const resolveNextConfig = async (
  baseConfig: WebpackConfig
): Promise<NextConfig> => {
  const nextConfigExport = await import(path.resolve('next.config.js'))
  return typeof nextConfigExport === 'function'
    ? nextConfigExport(PHASE_DEVELOPMENT_SERVER, { defaultConfig: baseConfig })
    : nextConfigExport
}

export const configureRootAbsoluteImport = (baseConfig: WebpackConfig): void =>
  void baseConfig.resolve?.modules?.push(path.resolve())

export const configureCss = (
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

export const configureStaticImageImport = (baseConfig: WebpackConfig): void => {
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
            loader: path.resolve(__dirname, '../images/next-image-loader-stub'),
            options: {
              filename: rule.generator?.filename
            }
          }
        ]
      }
    }
  })
}

// This resolves the router context path with the installed version of Next.js
// This is also to help the addon in development
// Without it, the addon resolves packages in its node_modules instead of the example's node_modules
export const configureModuleAliases = (baseConfig: WebpackConfig): void => {
  if (!baseConfig.resolve) baseConfig.resolve = {}
  if (!baseConfig.resolve.alias) baseConfig.resolve.alias = {}

  const aliasConfig = baseConfig.resolve.alias
  const routerContextPath = getRouterContextPath()
  ;['next/image', routerContextPath, 'styled-jsx'].forEach(name =>
    addScopedAlias(aliasConfig, name, name)
  )

  addScopedAlias(
    aliasConfig,
    routerContextPath,
    require.resolve('../routing/resolved-router-context')
  )
}

const addScopedAlias = (
  aliasConfig: NonNullable<NonNullable<WebpackConfig['resolve']>['alias']>,
  alias: string,
  name: string
) => {
  const scopedAlias = path.resolve(`node_modules/${alias}`)
  if (Array.isArray(aliasConfig)) {
    aliasConfig.push({
      name,
      alias: scopedAlias
    })
  } else {
    aliasConfig[name] = scopedAlias
  }
}

const getRouterContextPath = () => {
  const version = getNextjsVersion()
  if (semver.gte(version, '12.0.0')) {
    return 'next/dist/shared/lib/router-context'
  } else {
    return 'next/dist/next-server/lib/router-context'
  }
}

const getNextjsVersion = () =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require(path.resolve('node_modules/next/package.json')).version
