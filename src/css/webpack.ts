import { NextConfig } from 'next'
import { getCssModuleLocalIdent } from 'next/dist/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent'
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
              // this is what nextjs is doing
              // https://github.com/vercel/next.js/blob/b7725133f867b5e530dd4bb5d1fd8d5d389e3364/packages/next/build/webpack/config/blocks/css/loaders/global.ts#L32
              // https://github.com/vercel/next.js/blob/b7725133f867b5e530dd4bb5d1fd8d5d389e3364/packages/next/build/webpack/config/blocks/css/loaders/file-resolve.ts
              url: (url: string) => {
                if (url.startsWith('/')) {
                  return false
                }
                if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
                  return false
                }
                return true
              },
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
