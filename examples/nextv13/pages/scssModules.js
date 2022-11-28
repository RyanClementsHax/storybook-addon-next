import { Header } from 'components/Header'
import Head from 'next/head'
import styles from '../styles/ScssModules.module.scss'

export default function ScssModules() {
  return (
    <div>
      <Head>
        <title>SCSS Modules</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <p>This is styled using SCSS Modules</p>
      </main>
    </div>
  )
}
