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

  const [processID, setProcessID] = useState<string>('')

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

  async function getBlocksByProcessId() {
    setBtnDisabled(true)
    
    if (!!processID) {
      await api.get(`/product?process_id=${processID}`)
        .then(response => {
          setBtnDisabled(false)

          console.log(response.data)
          router.push(`/query/process/${processID}`)
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
        <title>Pesquisar processo</title>
      </Head>

      <Header isHomePage={false} />

      <MainContainer>
        <div className={styles.contentContainer}>
          <TextField 
            label="process Id" 
            variant="outlined" 
            type="number"
            classes={classes}
            value={processID}
            onChange={(event) => setProcessID(String(event.target.value))}
          />

          <Button
            variant="contained" 
            color="primary"
            disabled={btnDisabled}
            onClick={() => getBlocksByProcessId()}
          >
            Pesquisar
          </Button>
        </div>
      </MainContainer>
    </Layout>
  )
}