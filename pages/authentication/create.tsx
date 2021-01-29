import { useState } from 'react'
import Head from 'next/head'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import MainContainer from './../../components/MainContainer'

import styles from './../../styles/CreateUser.module.css'

import api from './../../config/api'

export default function CreateUser() {
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [tipo, setTipo] = useState<string>('')

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

  async function handleCreateUser() {
    setBtnDisabled(true)

    if (!!email && !!senha && !!tipo) {
      await api.post('/users',  {
        email,
        senha,
        tipo
      })
        .then(response => {
          setBtnDisabled(false)

          alert('Usuario criado com sucesso!')
        })
        .catch(error => {
          setBtnDisabled(false)

          alert('Erro ao tentar criar usuario, verifique as informações e tente novamente!')
        })
    } else {
      setBtnDisabled(false)

      alert('Preencha todos os campos corretamente')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Criar usuaário</title>
      </Head>

      <Header isHomePage={true} />

      <MainContainer>
        <form className={styles.contentContainer}>
          <TextField 
            label="email" 
            variant="outlined"
            type="email"
            style={{backgroundColor: '#FFF'}}
            value={email}
            onChange={(event) => setEmail(String(event.target.value))}
          />
          <TextField 
            label="senha" 
            variant="outlined" 
            type='password'
            style={{backgroundColor: '#FFF'}}
            value={senha}
            onChange={(event) => setSenha(String(event.target.value))}
          />
          
          <FormControl style={{backgroundColor: '#FFF'}}>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={tipo}
              onChange={(event) => setTipo(String(event.target.value))}
            >
              <MenuItem value='producao'>produção</MenuItem>
              <MenuItem value='transporte'>transporte</MenuItem>
              <MenuItem value='industria'>industria</MenuItem>
              <MenuItem value='comercializacao'>comercialização</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained" 
            color="secondary"
            onClick={() => handleCreateUser()}
            disabled={btnDisabled}
          >
            Cadastrar
          </Button>
        </form>
      </MainContainer>
    </Layout>
  )
}