import { Header } from 'components/Header'
import Image from 'next/image'
import Head from 'next/head'
import nyanCatImgSrc from 'public/nyan-cat.png'

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
        <p>This image uses a static import with a "placeholder="blur"</p>
        <Image
          src={nyanCatImgSrc}
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          alt="Nyan Cat"
        />
      </main>
    </div>
  )
}
