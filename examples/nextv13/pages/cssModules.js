import { Header } from 'components/Header'
import Head from 'next/head'
import styles from '../styles/CssModules.module.css'

export default function CssModules() {
  return (
    <div>
      <Head>
        <title>CSS Modules</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <p>This is styled using CSS Modules</p>
      </main>
    </div>
  )
}
