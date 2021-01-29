import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import MainContainer from './../../components/MainContainer'

import styles from './../../styles/Process.module.css'

import api from './../../config/api'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent'
  },
}))

export default function ProcessIDQuery() {
  const classes = useStyles()
  const router = useRouter()

  const [ProductID, setProductID] = useState<string>('')

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

  async function getBlocksByProductID() {
    setBtnDisabled(true)
    
    if (!!ProductID) {
      await api.get(`/product?product_id=${ProductID}`)
        .then(response => {
          setBtnDisabled(false)

          console.log(response.data)
          router.push(`/query/product/${ProductID}`)
        })
        .catch(error => {
          setBtnDisabled(false)

          alert('Process id invalid')
        })
    } else {
      alert('identificador do processo não informado')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Pesquisar produto</title>
      </Head>

      <Header isHomePage={false} isConsumer={true} />

      <MainContainer>
        <div className={styles.contentContainer}>
          <TextField 
            label="process Id" 
            variant="outlined" 
            type="number"
            classes={classes}
            value={ProductID}
            onChange={(event) => setProductID(String(event.target.value))}
          />

          <Button
            variant="contained" 
            color="primary"
            disabled={btnDisabled}
            onClick={() => getBlocksByProductID()}
          >
            Pesquisar
          </Button>
        </div>
      </MainContainer>
    </Layout>
  )
}