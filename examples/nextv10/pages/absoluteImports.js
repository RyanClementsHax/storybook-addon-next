import { Header } from 'components/Header'
import { MyComponent } from 'components/MyComponent'
import Head from 'next/head'

export default function AbsoluteImports() {
  return (
    <div>
      <Head>
        <title>Absolute Imports</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <p>This uses an absolute import:</p>
        <MyComponent>Im absolutely imported</MyComponent>
      </main>
    </div>
  )
}
