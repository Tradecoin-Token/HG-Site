import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { fromBase58Check, toBech32 } from "bitcoinjs-lib/src/address";

import Routes from "./routes";
import AddressView from "components/AddressView";
import Menu from "components/AuthMenu";
import styles from "./AuthLayout.module.scss";

import WavesConfig from "config/waves";
import ApiUtils from "utils/api";
import WavesUtils from "utils/waves";
import priceContainer from "redux/containers/price";
import walletContainer from "redux/containers/wallet";

function Layout({ walletState, walletActions, priceActions }) {
  useEffect(() => {
    let interval = -1;
    if (walletState.address && walletState.publicKey) {
      const proc = () => {
        WavesUtils.getBalance(
          walletActions.setBalance,
          walletActions.lockWallet
        );
        ApiUtils.getPrice(
          WavesConfig.WAVES_ID,
          WavesConfig.USDT_DECIMALS,
          "WAVES",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.BUSD_ID,
          WavesConfig.WAVES_DECIMALS,
          "BUSD",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.USDT_ID,
          WavesConfig.WAVES_DECIMALS,
          "USDT",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.USDC_ID,
          WavesConfig.WAVES_DECIMALS,
          "USDC",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.BTC_ID,
          WavesConfig.USDT_DECIMALS,
          "BTC",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.USDC_ID,
          WavesConfig.WAVES_DECIMALS,
          "USDN",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.HASH_ID,
          WavesConfig.USDT_DECIMALS,
          "HASH",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.KUSD_ID,
          WavesConfig.WAVES_DECIMALS,
          "KUSD",
          priceActions.setPrice
        );
        ApiUtils.getPrice(
          WavesConfig.RKMT_ID,
          WavesConfig.WAVES_DECIMALS + WavesConfig.RKMT_DECIMALS,
          "RKMT",
          priceActions.setPrice
        );
      };
      const initGateway = async () => {
        const accessToken = await WavesUtils.getAccessToken(
          walletState.publicKey
        );
        const [gateway] = await WavesUtils.getGatewayAddress(
          "BUSD",
          "BSC",
          accessToken
        );
        walletActions.setGateway(gateway);
        const [btcGateway] = await WavesUtils.getGatewayAddress(
          "BTC",
          "BTC",
          accessToken
        );
        const { version, hash } = fromBase58Check(btcGateway);
        const segwit = toBech32(hash, version, "bc");
        walletActions.setBtcSegWit(segwit);
      };
      if (walletState.gateway === "" && walletState.segWit === "")
        initGateway();

      proc();
      interval = setInterval(proc, 60000);
    }

    return () => {
      if (interval > -1) {
        clearInterval(interval);
      }
    };
  }, [
    priceActions.setPrice,
    walletActions,
    walletState.address,
    walletState.gateway,
    walletState.publicKey,
    walletState.segWit,
  ]);

  if (!walletState.address) {
    return <Redirect to="/" />;
  }
  return (
    <div className={styles.authLayout}>
      <div className={styles.addressList}>
        <AddressView />
      </div>
      <Menu />
      <Routes />
    </div>
  );
}

export default priceContainer(walletContainer(Layout));
