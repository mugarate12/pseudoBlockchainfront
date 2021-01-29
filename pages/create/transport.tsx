import Head from 'next/head'
import { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import MainContainer from './../../components/MainContainer'

import styles from './../../styles/InsertionBlocks.module.css'

import api from './../../config/api'

const useStyles = makeStyles({
  root: {
    width: 230,
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    fontSize: 24
  },
  titlePage: {
    fontSize: 24,
    marginLeft: 35,
    marginTop: 70
  }
})

export default function CreateProductTransport() {
  const classes = useStyles()

  const [temperatura, setTemperatura] = useState<number>(0)
  const [process_id, setProcess_id] = useState<number>(0)

  async function createProduct() {
    const isNotEmptyFields = !!temperatura && !!process_id
    
    if (isNotEmptyFields) {
      console.log(sessionStorage.getItem('tipo'))
      
      await api.post(`/product?tipo=transporte`, {
        temperatura,
        process_id
      })
        .then(response => {
          console.log(response.data)
          alert(response.data.sucess)
        })
        .catch(error => {
          console.log(error)

          alert('Dados invalidos, verifique-os e envie novamente')
        })
    } else {
      alert('Preencha todos os campos')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Criar transporte</title>
      </Head>

      <Header isHomePage={false} />

      <MainContainer>
        <h2 className={styles.title}>Etapa de transporte</h2>

        <form 
          className={styles.form}
          style={{height: '180px'}}
        >
          <TextField 
            label="Temperatura" 
            variant="outlined" 
            type="number"
            value={temperatura}
            onChange={(event) => setTemperatura(Number(event.target.value))}
          />

          <TextField 
            label="id do processo" 
            variant="outlined" 
            type="number"
            value={process_id}
            onChange={(event) => setProcess_id(Number(event.target.value))}
          />

          <Button
            variant="contained" 
            color="primary"
            onClick={() => createProduct()}
          >
            Criar
          </Button>
        </form>
      </MainContainer>
    </Layout>
  )
}