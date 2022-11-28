module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    mySecret: 'secret'
  },
  publicRuntimeConfig: {
    message: 'notice how serverRuntimeConfig is empty'
  }
}
