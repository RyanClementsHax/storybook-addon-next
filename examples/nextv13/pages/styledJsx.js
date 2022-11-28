import { Header } from 'components/Header'
import Head from 'next/head'

export default function StyledJsx() {
  return (
    <div>
      <Head>
        <title>Styled JSX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <style jsx>{`
        .main p {
          color: blue;
        }
      `}</style>
      <main className="main">
        <p>This is styled using Styled JSX</p>
      </main>
    </div>
  )
}
