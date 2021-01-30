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

export default function CreateProductProduction() {
  const classes = useStyles()

  const [quantidade_em_litros, setQuantidadeEmLitros] = useState<number>(0)
  const [localizacao, setLocalização] = useState<string>('')
  const [temperatura, setTemperatura] = useState<number>(0)
  const [ITGU, setITGU] = useState<number>(0)
  const [data, setDate] = useState<string>('')


  async function createProduct() {
    const isNotEmptyFields = !!quantidade_em_litros && !!localizacao && !!temperatura && !!ITGU && !!data
    
    if (isNotEmptyFields) {
      console.log(sessionStorage.getItem('tipo'))
      
      await api.post(`/product?tipo=producao`, {
        quantidade_em_litros,
        localizacao,
        temperatura,
        ITGU,
        data
      })
        .then(response => {
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
        <title>Criar produção</title>
      </Head>

      <Header isHomePage={false} />

      <MainContainer>
        <h2 className={styles.title}>Etapa de produção</h2>

        <form 
          className={styles.form}
          style={{height: '380px'}}
        >
          <TextField 
            label="quantidade em litros" 
            variant="outlined" 
            type="number"
            value={quantidade_em_litros}
            onChange={(event) => setQuantidadeEmLitros(Number(event.target.value))}
          />

          <TextField 
            label="Localização" 
            variant="outlined"
            value={localizacao}
            onChange={(event) => setLocalização(String(event.target.value))}
            // type="number"
          />

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
            label="ITGU" 
            variant="outlined" 
            type="number"
            value={ITGU}
            onChange={(event) => setITGU(Number(event.target.value))}
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