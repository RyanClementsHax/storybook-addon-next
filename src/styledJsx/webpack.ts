import semver from 'semver'
import { Configuration as WebpackConfig } from 'webpack'
import { addScopedAlias, getNextjsVersion } from '../utils'

export const configureStyledJsx = (baseConfig: WebpackConfig): void => {
  const version = getNextjsVersion()
  if (semver.gte(version, '12.0.0')) {
    addScopedAlias(baseConfig, 'styled-jsx')
  } else {
    addScopedAlias(baseConfig, 'styled-jsx/babel')
    addScopedAlias(baseConfig, 'styled-jsx/css')
    addScopedAlias(baseConfig, 'styled-jsx/macro')
    addScopedAlias(baseConfig, 'styled-jsx/server')
    addScopedAlias(baseConfig, 'styled-jsx/style')
    addScopedAlias(baseConfig, 'styled-jsx/webpack')
  }
}
