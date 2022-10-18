import cx from 'classnames'
import React, { useContext } from 'react'
import walletContainer from 'redux/containers/wallet'

import { ThemeContext } from "context/ThemeContext";

import styles from './Step.module.scss'

function Step({index, title, image, content, link}) {
  const { theme } = useContext(ThemeContext);

  const openLink = () => {
    window.open(link)
  }

  return (
    <div className={cx(styles.step, styles.glow)} style={{backgroundColor: theme.stepBackground,  boxShadow: theme.glow}}>
      <div className={styles.info}>
        <div className={styles.index} style={{color: theme.commentText}} >STEP {index}:</div>
        <div className={styles.title} style={{color: theme.primaryText}}>{title}</div>
        <div className={styles.image}><img src={image} alt="" /></div>
        <div className={styles.content} style={{color: theme.commentText}}>{content}</div>
      </div>
      <div className={styles.buttons}>
        <span className={cx(styles.button, styles.filled)} onClick={openLink} style={{backgroundColor: theme.buttonBack}}>Watch Video</span>
      </div>
    </div>
  )
}

export default walletContainer(Step)