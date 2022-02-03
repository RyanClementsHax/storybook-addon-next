import { NextConfig } from 'next'
import { getCssModuleLocalIdent } from 'next/dist/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent'
import { cssFileResolve } from 'next/dist/build/webpack/config/blocks/css/loaders/file-resolve'
import { Configuration as WebpackConfig } from 'webpack'

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
              url: (url: string, resourcePath: string) =>
                cssFileResolve(
                  url,
                  resourcePath,
                  nextConfig.experimental?.urlImports
                ),
              import: (url: string, _: unknown, resourcePath: string) =>
                cssFileResolve(
                  url,
                  resourcePath,
                  nextConfig.experimental?.urlImports
                ),
              modules: {
                auto: true,
                getLocalIdent: getCssModuleLocalIdent
              }
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
          url: (url: string, resourcePath: string) =>
            cssFileResolve(
              url,
              resourcePath,
              nextConfig.experimental?.urlImports
            ),
          import: (url: string, _: unknown, resourcePath: string) =>
            cssFileResolve(
              url,
              resourcePath,
              nextConfig.experimental?.urlImports
            ),
          modules: { auto: true, getLocalIdent: getCssModuleLocalIdent }
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
