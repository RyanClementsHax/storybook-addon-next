import Head from 'next/head'
import VercelSvg from '../public/vercel.svg'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Storybook Addon Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Below is an svg imported as a react component using svgr</p>
        <VercelSvg />
      </main>
    </div>
  )
}
