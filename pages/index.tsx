import Head from 'next/head'
import { useRouter } from 'next/router';

import Layout from './../components/Layout'

import Button from '@material-ui/core/Button'

import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Página inicial</title>
      </Head>

      <div className={styles.container}>

        <div className={styles.btnContainer}>
          <Button
            variant="contained" 
            color='secondary'
            onClick={() => router.push('/authentication/login')}
          >
            Sou produtor
          </Button>

          <Button
            variant="contained" 
            color="primary"
            onClick={() => router.push('/query/product')}
          >
            Sou consumidor
          </Button>
        </div>
      </div>

    </Layout>
  )
}
