import path from 'path'

export const getNextjsVersion = (): string =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require(path.resolve('node_modules/next/package.json')).version
