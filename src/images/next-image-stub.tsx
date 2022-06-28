/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as _NextImage from 'next/image'
import { ImageProps } from 'next/image'
import semver from 'semver'

// next v9 (doesn't have next/image)
if (semver.gt(process.env.__NEXT_VERSION!, '9.0.0')) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const NextImage = require('next/image') as typeof _NextImage

  const OriginalNextImage = NextImage.default

  Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props: ImageProps) =>
      typeof props.src === 'string' ? (
        <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
      ) : (
        <OriginalNextImage {...props} unoptimized />
      )
  })

  // https://github.com/vercel/next.js/issues/36417#issuecomment-1117360509
  if (
    semver.gte(process.env.__NEXT_VERSION!, '12.1.5') &&
    semver.lt(process.env.__NEXT_VERSION!, '12.2.0')
  ) {
    Object.defineProperty(NextImage, '__esModule', {
      configurable: true,
      value: true
    })
  }
}
