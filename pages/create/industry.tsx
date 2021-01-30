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

  const [data, setDate] = useState<string>('')
  const [temperatura, setTemperatura] = useState<number>(0)
  const [qualidade_do_produto, setQualidade_do_produto] = useState<number>(0)
  const [process_id, setProcess_id] = useState<number>(0)
  
  async function createProduct() {
    const isNotEmptyFields = !!temperatura && !!process_id && !!data && !!qualidade_do_produto
    
    if (isNotEmptyFields) {
      console.log(sessionStorage.getItem('tipo'))
      
      await api.post(`/product?tipo=transporte`, {
        data,
        temperatura,
        qualidade_do_produto,
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
        <title>Criar insdustria</title>
      </Head>

      <Header isHomePage={false} />

      <MainContainer>
        <h2 className={styles.title}>Etapa de industria</h2>

        <form 
          className={styles.form}
          style={{ height: '330px' }}
        >
          <TextField 
            variant="outlined"
            type="date"
            value={data}
            onChange={(event) => setDate(String(event.target.value))}
          />

          <TextField 
            label="Temperatura" 
            variant="outlined" 
            type="number"
            value={temperatura}
            onChange={(event) => setTemperatura(Number(event.target.value))}
          />

          <TextField 
            label="qualidade do produto" 
            variant="outlined" 
            type="number"
            value={qualidade_do_produto}
            onChange={(event) => setQualidade_do_produto(Number(event.target.value))}
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