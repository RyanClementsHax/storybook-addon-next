/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as _NextFutureImage from 'next/future/image'
import { ImageProps } from 'next/future/image'
import semver from 'semver'

// `next/future/image` are introduced by next v12.2
if (semver.gt(process.env.__NEXT_VERSION!, '12.2.0')) {
  const NextFutureImage =
    require('next/future/image') as typeof _NextFutureImage

  const OriginalNextFutureImage = NextFutureImage.default

  Object.defineProperty(NextFutureImage, 'default', {
    configurable: true,
    value: (props: ImageProps) =>
      typeof props.src === 'string' ? (
        <OriginalNextFutureImage
          {...props}
          unoptimized
          blurDataURL={props.src}
        />
      ) : (
        <OriginalNextFutureImage {...props} unoptimized />
      )
  })
}
