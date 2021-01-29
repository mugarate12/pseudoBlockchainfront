import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import Layout from './../../../components/Layout'
import Header from './../../../components/Header'

import styles from './../../../styles/queryProcessId.module.css'

import api from './../../../config/api'

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

export default function ProcessBlocks() {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()

  const [blocks, setBlocks] = useState([])

  async function getBlocksWithProcessId() {
    if (!!id) {
      await api.get(`/product?product_id=${id}`)
        .then(response => {
          console.log(response.data.blocks)
          setBlocks(response.data.blocks)
        })
        .catch(error => {
          alert('erro inexperado, por favor, refaça o processo')
        })

    } else {
      router.push('/query/process')
    }
  }

  function renderBlocks() {
    return blocks.map((block, index) => {
      if (block.tipo === 'producao') {
        return (
          <Card
            className={classes.root}
            variant='elevation'
          >
            <CardMedia
              className={classes.media}
              image='/img/producao.jpeg'
              title='Produção img example'
            />
            <CardContent>
              <Typography color='textPrimary' className={classes.title} gutterBottom>{block.tipo}</Typography>

              <Typography color='textSecondary' component="p">Quantilidade em litros</Typography>
              <Typography color='textSecondary' component="p">{block.quantidade_em_litros}</Typography>

              <Typography color='textSecondary' component="p">Localização</Typography>
              <Typography color='textSecondary' component="p">{block.localizacao}</Typography>

              <Typography color='textSecondary' component="p">Temperatura</Typography>
              <Typography color='textSecondary' component="p">{block.temperatura}</Typography>

              <Typography color='textSecondary' component="p">ITGU</Typography>
              <Typography color='textSecondary' component="p">{block.ITGU}</Typography>
            </CardContent>
          </Card>
        )
      } else if (block.tipo === 'transporte') {
        return (
          <Card
            className={classes.root}
            variant='elevation'
          >
            <CardMedia
              className={classes.media}
              image='/img/transporte.jpg'
              title='Transporte img example'
            />
            <CardContent>
              <Typography color='textPrimary' className={classes.title} gutterBottom>{block.tipo}</Typography>

              <Typography color='textSecondary' component="p">Temperatura</Typography>
              <Typography color='textSecondary' component="p">{block.temperatura}</Typography>
            </CardContent>
          </Card>
        )
      } else if (block.tipo === 'industria') {
        return (
          <Card
            className={classes.root}
            variant='elevation'
          >
            <CardMedia
              className={classes.media}
              image='/img/industria.jpg'
              title='Industria img example'
            />
            <CardContent>
              <Typography color='textPrimary' className={classes.title} gutterBottom>{block.tipo}</Typography>


              <Typography color='textSecondary' component="p">Data</Typography>
              <Typography color='textSecondary' component="p">{block.data}</Typography>

              <Typography color='textSecondary' component="p">Temperatura</Typography>
              <Typography color='textSecondary' component="p">{block.temperatura}</Typography>

              <Typography color='textSecondary' component="p">Qualidade do produto</Typography>
              <Typography color='textSecondary' component="p">{block.qualidade_do_produto}</Typography>
            </CardContent>
          </Card>
        )
      } else {
        return (
          <Card
            className={classes.root}
            variant='elevation'
          >
            <CardMedia
              className={classes.media}
              image='/img/industria.jpg'
              title='Comercialização img example'
            />
            <CardContent>
              <Typography color='textPrimary' className={classes.title} gutterBottom>{block.tipo}</Typography>

              <Typography color='textSecondary' component="p">Data</Typography>
              <Typography color='textSecondary' component="p">{block.data}</Typography>

              <Typography color='textSecondary' component="p">Lote</Typography>
              <Typography color='textSecondary' component="p">{block.lote}</Typography>

              <Typography color='textSecondary' component="p">Identificador do produto</Typography>
              <Typography color='textSecondary' component="p">{block.product_id}</Typography>
            </CardContent>
          </Card>
        )
      }
    })
  }

  useEffect(() => {
    getBlocksWithProcessId()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Blocos</title>
      </Head>

      <Header isHomePage={false} />

      <Typography color='textPrimary' className={classes.titlePage} gutterBottom>Consulta do processo de número: {id}</Typography>
      
      <div className={styles.content}>
        <div className={styles.mainContent}>
          {renderBlocks()}
        </div>
      </div>

    </Layout>
  );
}