import React from 'react'

import styles from './index.module.css'

export const Button = ({ children, onClick, type = 'button' }) => (
  <button className={styles.btn} type={type} onClick={onClick}>
    {children}
  </button>
)
