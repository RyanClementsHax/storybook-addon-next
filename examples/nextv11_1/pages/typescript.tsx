import { Header } from 'components/Header'
import Head from 'next/head'

export default function Typescript(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Typescript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <p>This is a page using typescript</p>
      </main>
    </div>
  )
}
