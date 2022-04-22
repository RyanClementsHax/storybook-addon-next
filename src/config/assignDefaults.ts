/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import semver from 'semver'
import { getNextjsVersion } from '../utils'

export const assignDefaults = (userConfig: any): any => {
  const nextjsVersion = getNextjsVersion()
  if (semver.gte(nextjsVersion, '12.0.0')) {
    return assignDefaultsV12(userConfig)
  } else if (semver.gte(nextjsVersion, '11.1.0')) {
    return assignDefaultsV11_1(userConfig)
  } else if (semver.gte(nextjsVersion, '11.0.0')) {
    return assignDefaultsV11_0(userConfig)
  } else if (semver.gte(nextjsVersion, '10.0.0')) {
    return assignDefaultsV10(userConfig)
  } else {
    // there are no defaults we care to assign for nextjs versions before 10
    return userConfig
  }
}

// these are reduced versions of how next.js assigns defaults for different next.js versions

// https://github.com/vercel/next.js/blob/v12.1.5/packages/next/server/config.ts
const assignDefaultsV12 = (userConfig: any): any => {
  const { defaultConfig } = require('next/dist/server/config-shared')
  const { imageConfigDefault } = require('next/dist/server/image-config')

  const config = Object.keys(userConfig).reduce<any>((currentConfig, key) => {
    const value = userConfig[key]

    if (value === undefined || value === null) {
      return currentConfig
    }

    if (!!value && value.constructor === Object) {
      currentConfig[key] = {
        ...defaultConfig[key],
        ...Object.keys(value).reduce<any>((c, k) => {
          const v = value[k]
          if (v !== undefined && v !== null) {
            c[k] = v
          }
          return c
        }, {})
      }
    } else {
      currentConfig[key] = value
    }

    return currentConfig
  }, {})

  const result = { ...defaultConfig, ...config }

  if (result.basePath !== '') {
    if (result.basePath !== '/') {
      if (result.assetPrefix === '') {
        result.assetPrefix = result.basePath
      }

      if (result.amp?.canonicalBase === '') {
        result.amp.canonicalBase = result.basePath
      }
    }
  }

  if (result?.images) {
    const images = result.images
    if (images.domains) {
      // static images are automatically prefixed with assetPrefix
      // so we need to ensure _next/image allows downloading from
      // this resource
      if (config.assetPrefix?.startsWith('http')) {
        images.domains.push(new URL(config.assetPrefix).hostname)
      }
    }

    if (!images.loader) {
      images.loader = 'default'
    }

    // Append trailing slash for non-default loaders and when trailingSlash is set
    if (images.path) {
      if (
        (images.loader !== 'default' &&
          images.path[images.path.length - 1] !== '/') ||
        result.trailingSlash
      ) {
        images.path += '/'
      }
    }

    if (images.path === imageConfigDefault.path && result.basePath) {
      images.path = `${result.basePath}${images.path}`
    }
  }

  return result
}

// https://github.com/vercel/next.js/blob/v11.1.4/packages/next/server/config.ts
const assignDefaultsV11_1 = (userConfig: any): any => {
  const { defaultConfig } = require('next/dist/server/config-shared')
  const { imageConfigDefault } = require('next/dist/server/image-config')

  const config = Object.keys(userConfig).reduce<{ [key: string]: any }>(
    (currentConfig, key) => {
      const value = userConfig[key]

      if (value === undefined || value === null) {
        return currentConfig
      }

      if (!!value && value.constructor === Object) {
        currentConfig[key] = {
          ...defaultConfig[key],
          ...Object.keys(value).reduce<any>((c, k) => {
            const v = value[k]
            if (v !== undefined && v !== null) {
              c[k] = v
            }
            return c
          }, {})
        }
      } else {
        currentConfig[key] = value
      }

      return currentConfig
    },
    {}
  )

  const result = { ...defaultConfig, ...config }

  if (result.basePath !== '') {
    if (result.basePath !== '/') {
      if (result.assetPrefix === '') {
        result.assetPrefix = result.basePath
      }

      if (result.amp?.canonicalBase === '') {
        result.amp.canonicalBase = result.basePath
      }
    }
  }

  if (result?.images) {
    const images = result.images

    if (!images.loader) {
      images.loader = 'default'
    }

    // Append trailing slash for non-default loaders
    if (images.path) {
      if (
        images.loader !== 'default' &&
        images.path[images.path.length - 1] !== '/'
      ) {
        images.path += '/'
      }
    }

    if (images.path === imageConfigDefault.path && result.basePath) {
      images.path = `${result.basePath}${images.path}`
    }
  }

  return result
}

// https://github.com/vercel/next.js/blob/v11.0.1/packages/next/next-server/server/config.ts
const assignDefaultsV11_0 = (userConfig: any): any => {
  const {
    defaultConfig
  } = require('next/dist/next-server/server/config-shared')
  const {
    imageConfigDefault
  } = require('next/dist/next-server/server/image-config')

  const config = Object.keys(userConfig).reduce<{ [key: string]: any }>(
    (currentConfig, key) => {
      const value = userConfig[key]

      if (value === undefined || value === null) {
        return currentConfig
      }

      if (!!value && value.constructor === Object) {
        currentConfig[key] = {
          ...defaultConfig[key],
          ...Object.keys(value).reduce<any>((c, k) => {
            const v = value[k]
            if (v !== undefined && v !== null) {
              c[k] = v
            }
            return c
          }, {})
        }
      } else {
        currentConfig[key] = value
      }

      return currentConfig
    },
    {}
  )

  const result = { ...defaultConfig, ...config }

  if (result.basePath !== '') {
    if (result.basePath !== '/') {
      if (result.assetPrefix === '') {
        result.assetPrefix = result.basePath
      }

      if (result.amp.canonicalBase === '') {
        result.amp.canonicalBase = result.basePath
      }
    }
  }

  if (result?.images) {
    const images = result.images

    if (!images.loader) {
      images.loader = 'default'
    }

    // Append trailing slash for non-default loaders
    if (images.path) {
      if (
        images.loader !== 'default' &&
        images.path[images.path.length - 1] !== '/'
      ) {
        images.path += '/'
      }
    }

    if (images.path === imageConfigDefault.path && result.basePath) {
      images.path = `${result.basePath}${images.path}`
    }
  }
}

// https://github.com/vercel/next.js/blob/v10.2.3/packages/next/next-server/server/config.ts
const assignDefaultsV10 = (userConfig: any): any => {
  const {
    defaultConfig
  } = require('next/dist/next-server/server/config-shared')
  const {
    imageConfigDefault
  } = require('next/dist/next-server/server/image-config')

  const config = Object.keys(userConfig).reduce<{ [key: string]: any }>(
    (currentConfig, key) => {
      const value = userConfig[key]

      if (value === undefined || value === null) {
        return currentConfig
      }

      if (!!value && value.constructor === Object) {
        currentConfig[key] = {
          ...defaultConfig[key],
          ...Object.keys(value).reduce<any>((c, k) => {
            const v = value[k]
            if (v !== undefined && v !== null) {
              c[k] = v
            }
            return c
          }, {})
        }
      } else {
        currentConfig[key] = value
      }

      return currentConfig
    },
    {}
  )

  const result = { ...defaultConfig, ...config }

  if (result.basePath !== '') {
    if (result.basePath !== '/') {
      if (result.assetPrefix === '') {
        result.assetPrefix = result.basePath
      }

      if (result.amp.canonicalBase === '') {
        result.amp.canonicalBase = result.basePath
      }
    }
  }

  if (result?.images) {
    const images = result.images

    if (!images.loader) {
      images.loader = 'default'
    }

    // Append trailing slash for non-default loaders
    if (images.path) {
      if (
        images.loader !== 'default' &&
        images.path[images.path.length - 1] !== '/'
      ) {
        images.path += '/'
      }
    }

    if (images.path === imageConfigDefault.path && result.basePath) {
      images.path = `${result.basePath}${images.path}`
    }
  }

  return result
}
