import * as _NextImage from 'next/image'
import { ImageProps } from 'next/image'

try {
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
} catch {
  // next v9 (doesn't have next/image)
}
