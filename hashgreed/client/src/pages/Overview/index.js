import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";

import styles from "./Overview.module.scss";

import walletContainer from "redux/containers/wallet";
import priceContainer from "redux/containers/price";
import { ThemeContext } from "context/ThemeContext";
import ApiUtils from "utils/api";
import WavesConfig from "config/waves";
import Transaction from "components/Transaction/Transaction";
import BalanceList from "./BalanceList";
import AddressView from "components/AddressView";

function Overview({ walletState, walletActions, priceState, priceActions }) {
  const { theme } = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);

  const onBuyHashCredits = () => {
    window.open("https://forms.gle/FJq27dXsHSDsGjXA9");
  };

  const onBuyCertCredits = () => {
    window.open("https://forms.gle/F1RWaosr5yU1ZeMv6");
  };

  useEffect(() => {
    if (walletState.address) {
      const proc = () => {
        priceActions.setPrice("RKMT", 0);
        ApiUtils.getPrice(
          WavesConfig.WAVES_ID,
          WavesConfig.USDT_DECIMALS,
          "WAVES",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.RKMT_ID,
          WavesConfig.WAVES_DECIMALS + WavesConfig.RKMT_DECIMALS,
          "RKMT",
          priceActions.setPrice
        );
        ApiUtils.getTransactions(walletState.address, setTransactions);
      };
      proc();
    }
  }, [walletState.address, priceActions]);

  return (
    <div className={styles.overview}>
      <div className={styles.heading}>
        <div className={styles.addressList}>
          <AddressView />
        </div>
        <BalanceList />
        <div className={styles.main}>
          <div
            className={styles.overviewHeader}
            style={{ color: theme.primaryText }}
          >
            You are Ready!
          </div>
          <div
            className={styles.overviewBody}
            style={{ color: theme.commentText }}
          >
            You're now connected and able to use the application. We recommend
            you to make a backup of your account seed words if you just created
            one. Losing them means loss of access to your account
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <div
          className={cx(styles.button, styles.filled)}
          onClick={onBuyHashCredits}
          style={{ backgroundColor: theme.buttonBack }}
        >
          Buy HASH credits
        </div>
        <div
          className={cx(styles.button, styles.outline)}
          onClick={onBuyCertCredits}
          style={{ borderColor: theme.buttonBack }}
        >
          Buy Cert Credits
        </div>
      </div>

      <div className={styles.transactionList}>
        <Transaction
          transactions={transactions}
          title="History"
          owner={walletState.address}
        />
      </div>
    </div>
  );
}

export default priceContainer(walletContainer(Overview));
