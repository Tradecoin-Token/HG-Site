import React, {useContext} from 'react'
import styles from './BuyHash.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function BuyHash(){
    const {theme} = useContext(ThemeContext)

    return(
        <div className={styles.buy}>
            <div className={styles.container} style={{color: theme.primaryText, textAlign:'justify'}}>
                <span className={styles.header}>Buy HASH Credits</span>
                <div className={styles.links}>
                    <a href="https://chaininvoice.co/general.php?id=Q0g4MTY1MDY=" target="_blank" rel="noreferrer">BUY N1,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g4NTE3NDc=" target="_blank" rel="noreferrer">BUY N5,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g2MTc0NzM=" target="_blank" rel="noreferrer">BUY N10,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g1NDQzMzY=" target="_blank" rel="noreferrer">BUY N50,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g5MDYxMTc=" target="_blank" rel="noreferrer">BUY N100,000 worth</a>
                    <a href="https://chaininvoice.co/general.php?id=Q0g2MjUyNTM=" target="_blank" rel="noreferrer">BUY N1million worth</a>
                </div>
            </div>
        </div>

    )
}

export default BuyHash