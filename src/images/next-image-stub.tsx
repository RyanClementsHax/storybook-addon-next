import * as _NextImage from 'next/image'
import { ImageProps } from 'next/image'
import semver from 'semver'

// next v9 (doesn't have next/image)
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
if (semver.gt(process.env.__NEXT_VERSION!, '9.0.0')) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const NextImage = require('next/image') as typeof _NextImage
  const OriginalNextImage = NextImage.default

  // eslint-disable-next-line no-import-assign
  Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props: ImageProps) =>
      typeof props.src === 'string' ? (
        <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
      ) : (
        <OriginalNextImage {...props} unoptimized />
      )
  })
}
