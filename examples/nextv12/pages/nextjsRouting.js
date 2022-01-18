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
      <main>The links used to navigate this example use next.js routing</main>
    </div>
  )
}
