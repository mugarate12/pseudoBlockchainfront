import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from './../../components/Layout'
import Header from './../../components/Header'
import MainContainer from './../../components/MainContainer'

import styles from './../../styles/CreateUser.module.css'

import api from './../../config/api'

export default function LoginUser() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

  async function handleLoginUser() {
    setBtnDisabled(true)

    if (!!email && !!senha) {
      await api.get(`/users?email=${email}&senha=${senha}`)
        .then(response => {
          setBtnDisabled(false)
          
          sessionStorage.setItem('email', response.data.email)
          sessionStorage.setItem('tipo', response.data.tipo)

          router.push('/query/process')
        })
        .catch(error => {
          setBtnDisabled(false)

          alert('Erro ao tentar logar usuario, verifique as informações e tente novamente!')
        })
    } else {
      setBtnDisabled(false)

      alert('Preencha todos os campos corretamente')
    }
  }

  // if (!!sessionStorage.getItem('email') && !!sessionStorage.getItem('tipo')) {
  //   router.push('/query/process')
  // }

  return (
    <Layout>
      <Head>
        <title>Logar usuário</title>
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

          <Button
            variant="contained" 
            color="primary"
            onClick={() => handleLoginUser()}
            disabled={btnDisabled}
          >
            Entrar
          </Button>
        </form>
      </MainContainer>
    </Layout>
  )
}