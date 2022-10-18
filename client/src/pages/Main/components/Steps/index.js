import React, {useContext} from 'react'

import Step from '../Step'
import styles from './Steps.module.scss'
import Step1Logo from 'assets/images/Step1.png'
import Step2Logo from 'assets/images/Step2.png'
import Step3Logo from 'assets/images/Step3.png'

import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from "context/ThemeContext";

const Step1Content = "Click on the “Watch Video” button below to see how to sign up on Hashgreed."
const Step2Content = "HASH credits is synonymous with Naira on Hashgreed. Cert credits are the credits needed to pay for the underlying transaction fees. Both are needed to begin shopping or selling on Hashgreed."
const Step3Content = 'Now that you have your HASH and Cert credits, go ahead and watch how to shop on Hashgreed. Also see the FAQ section for all other video tutorials.'

function Steps({walletState, login}) {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.steps}>
      <div className={styles.header} style={{color: theme.primaryText}}>FOLLOW THE STEPS TO USE <br/> OUR APPLICATION</div>
      <div className={styles.body}>
        <Step index={1} title={'Sign up'} image={Step1Logo} content={Step1Content} link='https://youtu.be/kC82FjzjSdI' />
        <Step index={2} title={'Buy Credits'} image={Step2Logo} content={Step2Content} link='https://youtu.be/6g58-r8pEik' />
        <Step index={3} title={'Bid/Buy'} image={Step3Logo} content={Step3Content} link='https://youtu.be/K7h1ZBtZBCQ' />
      </div>
    </div>
  )
}

export default walletContainer(Steps)