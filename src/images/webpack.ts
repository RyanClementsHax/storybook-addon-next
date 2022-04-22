import { NextConfig } from 'next'
import semver from 'semver'
import {
  Configuration as WebpackConfig,
  DefinePlugin,
  RuleSetRule
} from 'webpack'
import { addScopedAlias, getNextjsVersion } from '../utils'

export const configureImages = (
  baseConfig: WebpackConfig,
  nextConfig: NextConfig
): void => {
  configureStaticImageImport(baseConfig)
  configureImageOptions(baseConfig, nextConfig)
  addScopedAlias(baseConfig, 'next/image')
}

const configureStaticImageImport = (baseConfig: WebpackConfig): void => {
  const version = getNextjsVersion()
  if (semver.lt(version, '11.0.0')) return

  const rules = baseConfig.module?.rules
  const assetRule = rules?.find(
    rule =>
      typeof rule !== 'string' &&
      rule.test instanceof RegExp &&
      rule.test.test('test.jpg')
  ) as RuleSetRule
  assetRule.test = /\.(apng|eot|otf|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
  rules?.push({
    test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i,
    issuer: { not: /\.(css|scss|sass)$/ },
    use: [
      {
        loader: require.resolve('./next-image-loader-stub'),
        options: {
          filename: assetRule.generator?.filename
        }
      }
    ]
  })
  rules?.push({
    test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i,
    issuer: /\.(css|scss|sass)$/,
    type: 'asset/resource',
    generator: {
      filename: assetRule.generator?.filename
    }
  })
}

const configureImageOptions = (
  baseConfig: WebpackConfig,
  nextConfig: NextConfig
): void =>
  void baseConfig.plugins?.push(
    new DefinePlugin({
      // this mimics what nextjs does
      // https://github.com/vercel/next.js/blob/v12.1.5/packages/next/build/webpack-config.ts#L1374
      'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
        deviceSizes: nextConfig.images?.deviceSizes,
        imageSizes: nextConfig.images?.imageSizes,
        path: nextConfig.images?.path,
        loader: nextConfig.images?.loader,
        ...(baseConfig.mode === 'development'
          ? {
              // pass domains in development to allow validating on the client
              domains: nextConfig.images?.domains
            }
          : {})
      })
    })
  )
