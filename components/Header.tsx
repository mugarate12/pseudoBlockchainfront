import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import MenuIcon from '@material-ui/icons/Menu'

import styles from './../styles/Header.module.css'

type Props = {
  isHomePage: boolean,
  isConsumer?: boolean
}

export default function Header({ isHomePage, isConsumer }: Props) {
  const router = useRouter()
  
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  function renderProdutorOptions() {
    if (!isConsumer) {
      return (
        <>
          <List>
            <ListItem 
              button
              onClick={() => router.push('/create/production')}
            >
              <ListItemText>produção</ListItemText>
            </ListItem>

            <ListItem 
              button
              onClick={() => router.push('/create/transport')}
            >
              <ListItemText>transporte</ListItemText>
            </ListItem>
            
            <ListItem 
              button
              onClick={() => router.push('/create/industry')}
            >
              <ListItemText>industria</ListItemText>
            </ListItem>

            <ListItem 
              button
              onClick={() => router.push('/create/commercialization')}
            >
              <ListItemText>comercialização</ListItemText>
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem 
              button
              onClick={() => router.push('/query/process')}
            >
              <ListItemText>pesquisar</ListItemText>
            </ListItem>
          </List>
        
          <Divider />
        </>
      )
    }
  }

  function renderButtons() {
    if (isHomePage) {
      return (
        <>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => router.push('/authentication/login')}
          >
            Entrar
          </Button>

          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => router.push('/authentication/create')}
          >
            Registrar
          </Button>
        </>
      )
    } else {
      return (
        <>
          <IconButton
            aria-label='side menu'
            onClick={() => setOpenMenu(true)}
          >
            <MenuIcon fontSize='large' />
          </IconButton>

          <Drawer
            anchor='right'
            open={openMenu}
            onClose={() => setOpenMenu(false)}
          >
            <div className={styles.sideMenuContainer}>
              {renderProdutorOptions()}

              <List>
                <ListItem 
                  button
                  onClick={() => router.push('/')}
                >
                  <ListItemText>página inicial</ListItemText>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </>
      )
    }
  }

  return (
    <header className={styles.headerContainer}>
      <div className={isHomePage ? styles.btnsContainer : styles.menuContainer}>
        {renderButtons()}
      </div>
    </header>
  )
}