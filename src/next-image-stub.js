import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

// eslint-disable-next-line no-import-assign
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (/** @type {import('next/image').ImageProps} */ props) => {
    if (typeof props.src === 'string') {
      return (
        <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
      )
    } else {
      return <OriginalNextImage {...props} unoptimized />
    }
  }
})
