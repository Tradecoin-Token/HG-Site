import React, {useContext} from 'react'
import styles from './BuyCert.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function BuyCert(){
    const {theme} = useContext(ThemeContext)

    return(
        <div className={styles.buy}>
            <div className={styles.container} style={{color: theme.primaryText, textAlign:'justify'}}>
                <span className={styles.header}>Buy Cert Credits</span>
                <div className={styles.links}>
                    <a href="https://chaininvoice.co/general.php?id=Q0gxMTA3MzQ=" target="_blank" rel="noreferrer">BUY N1,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g3NzQwMzA=" target="_blank" rel="noreferrer">BUY N5,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g5NDUzMTY=" target="_blank" rel="noreferrer">BUY N10,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g4MDUzMDc=" target="_blank" rel="noreferrer">BUY N50,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g1MzY4OTc=" target="_blank" rel="noreferrer">BUY N100,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g5ODExODY=" target="_blank" rel="noreferrer">BUY N1million worth</a>
                </div>
            </div>
        </div>

    )
}

export default BuyCert