/* eslint-disable @typescript-eslint/no-var-requires */
const { interpolateName } = require('loader-utils')
const imageSizeOf = require('image-size').default

/** @typedef {{ filename: string }} LoaderOptions */
/**
 * @type {import('webpack').RawLoaderDefinition<LoaderOptions>}
 */
const nextImageLoaderStub = async function (content) {
  const { filename } = this.getOptions()
  const outputPath = interpolateName(
    this,
    filename.replace('[ext]', '.[ext]'),
    {
      context: this.rootContext,
      content
    }
  )

  this.emitFile(outputPath, content, undefined)

  const { width, height } = imageSizeOf(content)

  return `export default ${JSON.stringify({
    src: outputPath,
    height,
    width,
    blurDataURL: outputPath
  })};`
}

nextImageLoaderStub.raw = true

module.exports = nextImageLoaderStub
