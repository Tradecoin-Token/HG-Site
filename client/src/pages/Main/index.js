import React, { useCallback, useRef, useContext } from "react";
import cx from "classnames";
import { useHistory } from "react-router-dom";

import Steps from "./components/Steps";
import styles from "./Main.module.scss";

import walletContainer from "redux/containers/wallet";
import WavesUtils from "utils/waves";
import LoginModal from "components/LoginModal/LoginModal";
import { ThemeContext } from "context/ThemeContext";

function Main({ walletState, walletActions }) {
  const history = useHistory();
  const loginMdl = useRef(null);
  const { theme } = useContext(ThemeContext);

  const login = () => {
    // loginMdl.current.openModal()
    WavesUtils.unlockWallet(
      "SEED",
      walletActions.unlockWallet,
      walletActions.lockWallet
    );
  };

  const startLogin = () => {
    loginMdl.current.openModal();
  };

  const onSignMethod = (str) => {
    loginMdl.current.closeModal();
    WavesUtils.unlockWallet(
      str,
      walletActions.unlockWallet,
      walletActions.lockWallet
    );
  };

  const gotoOverview = useCallback(() => history.push("/overview"), [history]);
  return (
    <div className={styles.main}>
      <LoginModal ref={loginMdl} onSignMethods={(str) => onSignMethod(str)} />
      <div className={styles.header} style={{ color: theme.primaryText }}>
        Buy and Sell with Peace of Mind
      </div>
      <div className={styles.subheader} style={{ color: theme.commentText }}>
        for creators, shoppers, crypto defi natives, one platform for all
      </div>
      <div
        className={styles.subheader}
        style={{ color: theme.commentText, marginBottom: 60 }}
      >
        At Africa’s <b>First</b> NFT Marketplace
      </div>
      <div className={styles.startnow}>
        <span
          className={cx(styles.start, styles.filled)}
          onClick={walletState.address ? gotoOverview : startLogin}
          style={{ backgroundColor: theme.buttonBack }}
        >
          Start now
        </span>
      </div>
      <Steps login={login} />
    </div>
  );
}

export default walletContainer(Main);
