import { ReactNode } from 'react'

import styles from './../styles/MainContainer.module.css'

type Props = {
  children: ReactNode
}

export default function MainContainer({ children }: Props) {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}