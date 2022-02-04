import { Header } from 'components/Header'
import Image from 'next/image'
import Head from 'next/head'

export default function NextjsImages() {
  return (
    <div>
      <Head>
        <title>Nextjs Images</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <p>This image uses a remote image</p>
        <Image src="/vercel.svg" alt="Vercel Logo" width={200} height={200} />
      </main>
    </div>
  )
}
