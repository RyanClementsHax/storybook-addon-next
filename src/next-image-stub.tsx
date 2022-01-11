import React from 'react'
import * as NextImage from 'next/image'
import { ImageProps } from 'next/image'

console.log('modifying!!!', NextImage)

const OriginalNextImage = NextImage.default

// eslint-disable-next-line no-import-assign
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: ImageProps) => {
    console.log('in image', props)
    if (typeof props.src === 'string') {
      return (
        <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
      )
    } else {
      return <OriginalNextImage {...props} unoptimized />
    }
  }
})
