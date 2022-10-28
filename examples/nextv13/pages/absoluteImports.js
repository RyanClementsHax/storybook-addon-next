import { Header } from 'components/Header'
import { MyComponent } from 'components/MyComponent'
import { MyOtherComponent } from '@/components/MyOtherComponent'
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
        <p>Below are components imported using absolute imports:</p>
        <MyComponent>
          Im absolutely imported off of the base url in tsconfig.json
        </MyComponent>
        <MyOtherComponent>
          Im absolutely imported off of a path in tsconfig.json
        </MyOtherComponent>
      </main>
    </div>
  )
}
