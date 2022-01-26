import { Configuration as WebpackConfig } from 'webpack'
import { addScopedAlias, getNextjsVersion } from '../utils'
import semver from 'semver'

export const configureRouting = (baseConfig: WebpackConfig): void => {
  // here we resolve the router context path with the installed version of Next.js
  const routerContextPath = getRouterContextPath()
  addScopedAlias(baseConfig, routerContextPath)
  addScopedAlias(
    baseConfig,
    require.resolve('./resolved-router-context'),
    routerContextPath
  )
}

const getRouterContextPath = () => {
  const version = getNextjsVersion()
  if (semver.gte(version, '11.1.0')) {
    return 'next/dist/shared/lib/router-context'
  } else {
    return 'next/dist/next-server/lib/router-context'
  }
}
