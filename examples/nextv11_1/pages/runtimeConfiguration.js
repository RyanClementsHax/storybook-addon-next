import { Header } from 'components/Header'
import getConfig from 'next/config'
import Head from 'next/head'

export default function RuntimeConfiguration() {
  return (
    <div>
      <Head>
        <title>Runtime Configuration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <p>Here is the runtime Configuration:</p>
        <code>
          <pre>{JSON.stringify(getConfig(), null, 2)}</pre>
        </code>
      </main>
    </div>
  )
}
