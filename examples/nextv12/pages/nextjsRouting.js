import { Links } from 'components/Links'
import Head from 'next/head'

export default function NextjsRouting() {
  return (
    <div>
      <Head>
        <title>Nextjs Routing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Links />
      <main>
        Interact with any of the links and look at the "Actions" tab below
      </main>
    </div>
  )
}
