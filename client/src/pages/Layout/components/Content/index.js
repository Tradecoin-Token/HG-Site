import React from 'react'
import {Route, Switch} from 'react-router-dom'

import AuthLayout from 'pages/AuthLayout'
import Main from 'pages/Main'
import Verification from 'pages/Verification/VerificationExplorer'
import Faq from 'pages/Faq'
import Contact from 'pages/Contact'
import About from 'pages/About'
import Usecase from 'pages/Usecase'
import BuyHash from 'pages/BuyHash'
import BuyCert from 'pages/BuyCert'

function Content() {
  return (
    <Switch>
      <Route path={'/'} exact component={Main} />
      <Route path={'/explorer'} exact component={Verification} />
      <Route path={'/explorer/:txid'} component={Verification} />
      <Route path={'/faq'} component={Faq} />
      <Route path={'/contact'} component={Contact} />
      <Route path={'/about'} component={About} />
      <Route path={'/usecase'} component={Usecase} />
      <Route path={'/buy_hash'} component={BuyHash} />
      <Route path={'/buy_cert'} component={BuyCert} />
      <Route component={AuthLayout} />
    </Switch>
  )
}

export default Content