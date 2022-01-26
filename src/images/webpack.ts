import semver from 'semver'
import { Configuration as WebpackConfig } from 'webpack'
import { addScopedAlias, getNextjsVersion } from '../utils'

export const configureImages = (baseConfig: WebpackConfig): void => {
  configureStaticImageImport(baseConfig)
  addScopedAlias(baseConfig, 'next/image')
}

const configureStaticImageImport = (baseConfig: WebpackConfig): void => {
  const version = getNextjsVersion()
  if (semver.lt(version, '11.0.0')) return

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
            loader: require.resolve('./next-image-loader-stub'),
            options: {
              filename: rule.generator?.filename
            }
          }
        ]
      }
    }
  })
}
