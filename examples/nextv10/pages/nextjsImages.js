import { Links } from 'components/Links'
import Image from 'next/image'
import Head from 'next/head'

export default function NextjsImages() {
  return (
    <div>
      <Head>
        <title>Nextjs Images</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Links />
      <main>
        <h2>This image uses a remote image</h2>
        <Image src="/vercel.svg" alt="Vercel Logo" width={200} height={200} />
      </main>
    </div>
  )
}
