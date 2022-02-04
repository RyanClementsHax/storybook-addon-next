import { Header } from 'components/Header'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Custom Fonts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <p>This uses a custom font 👇</p>
        <p className="icons"> </p>
      </main>
    </div>
  )
}
