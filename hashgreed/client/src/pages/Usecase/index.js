import React, {useContext} from 'react'
import styles from './Usecase.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Usecase(){
    const {theme} = useContext(ThemeContext)

    return(
        <div className={styles.verficationExplorer}>
            <div className={styles.container} style={{color: theme.primaryText, textAlign:'justify'}}>
                <span className={styles.header}>HASHGREED USE CASES</span>
                <br/><br/>
                <div className={styles.faqData}>
                    <b>Artists</b>
                    <br/><br/>
                    Protect your artworks forever and sell to a global market
                    <br/><br/>

                    <b>Merchants</b>
                    <br/><br/>
                    Monetize with local and global currencies, sell with confidence and get faster payouts
                    <br/><br/>

                    <b>Shoppers</b>
                    <br/><br/>
                    Buy or bid with supreme confidence,  buy goods with naira or crypto
                    <br/><br/>
                    
                    <b>Content creators</b>
                    <br/><br/>
                    Protect and monetize your content, create and sell special rights of access to you
                    <br/><br/>
                    
                    <b>Need a loan?</b>
                    <br/><br/>
                    Experience the future of lending. Borrow for leverage or for emergencies or to grow your business
                    <br/><br/>

                    <b>Need more file storage space?</b>
                    <br/><br/>
                    Store files to the distributed file storage system called IPFS on Hashgreed. It allows for sharing videos and large files with its own global unique link
                    <br/><br/>

                    <b>Safe and secure Email communication</b>
                    <br/><br/>
                    Send blockchain certified emails which cannot be denied or unrecoverable when deleted
                    <br/><br/>

                    <b>Got to make a legal agreement?</b>
                    <br/><br/>
                    Use Hashgreed’s mutual certification tool to create an agreement with digital footprints on hundreds of computers. Tamper proof
                    <br/><br/>

                    <b>Hashgreed is your plug to smart business dealings</b>
                    <br/><br/>
                </div>
            </div>
        </div>

    )
}

export default Usecase