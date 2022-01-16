import * as NextImage from 'next/image'
import { ImageProps } from 'next/image'

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
