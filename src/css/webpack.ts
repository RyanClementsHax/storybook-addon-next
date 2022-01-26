import { NextConfig } from 'next'
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
