import React, { useState, useEffect, useContext } from "react";

import { FaCopy, FaShareAlt } from "react-icons/all";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "./Receive.module.scss";
import walletContainer from "redux/containers/wallet";
import Transaction from "components/Transaction/Transaction";
import ApiUtils from "utils/api";
import { ThemeContext } from "context/ThemeContext";
import WavesUtils from "utils/waves";
import WavesConfig from "config/waves";

function Receive({ walletState }) {
  const urlAddress = `${WavesConfig.EXPLORER_URL}/address/${walletState.address}`;
  const [transactions, setTransactions] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [alias, setAlias] = useState("");
  useEffect(() => {
    if (walletState.address) {
      const proc = async () => {
        ApiUtils.getReceiveTransactions(walletState.address, setTransactions);
        const aliases = await WavesUtils.getAliasList(walletState.address);
        setAlias(aliases.isEmpty() ? "" : aliases.join(", "));
      };
      proc();
    }
  }, [walletState.address]);

  const downloadQR = () => {
    const canvas = document.getElementById("ADDRESS");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "yourQrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const toExplorer = () => {
    window.open("https://wavesexplorer.com");
  };

  return (
    <div className={styles.receive}>
      <div className={styles.container}>
        <div className={styles.deposit} style={{ color: theme.primaryText }}>
          <div className={styles.title}>Deposit</div>
        </div>
        <hr className={styles.border} />
        <div className={styles.body}>
          <QRCode
            className={styles.qrcode}
            value={walletState.address}
            size={240}
            onClick={() => downloadQR()}
            id="ADDRESS"
          />
          <div className={styles.subbody}>
            <div
              className={styles.subheader}
              style={{ color: theme.commentText }}
            >
              Deposit Address
            </div>
            <div
              className={styles.codevalue}
              style={{ color: theme.primaryText }}
            >
              {walletState.address}
              {alias !== "" ? (
                <>
                  <br />
                  {`(Alias: ${alias})`}
                </>
              ) : (
                ""
              )}
            </div>
            <div className={styles.copy}>
              <CopyToClipboard
                text={walletState.address}
                style={{ color: theme.primaryText }}
              >
                <div className={styles.copyaddress1}>
                  <FaCopy className={styles.facopy} size="16px" />
                  Copy Address
                </div>
              </CopyToClipboard>
              <CopyToClipboard
                text={urlAddress}
                style={{ color: theme.primaryText }}
              >
                <a className={styles.copyaddress2} href={urlAddress}>
                  <FaShareAlt className={styles.fasharealt} size="16px" />
                  Copy Address
                </a>
              </CopyToClipboard>
            </div>
            <div className={styles.mobileCopy}>
              <CopyToClipboard
                text={walletState.address}
                style={{ opacity: "0.8" }}
              >
                <QRCode
                  className={styles.qrcodemobile}
                  value={walletState.address}
                  size={120}
                  onClick={() => downloadQR()}
                  id="ADDRESS"
                />
              </CopyToClipboard>
              <CopyToClipboard
                text={walletState.address}
                style={{ color: theme.primaryText }}
              >
                <FaCopy className={styles.facopy} size="24px" />
              </CopyToClipboard>
              <CopyToClipboard
                text={urlAddress}
                style={{ color: theme.primaryText }}
              >
                <a href={urlAddress}>
                  <FaShareAlt
                    className={styles.fasharealt}
                    size="24px"
                  ></FaShareAlt>
                </a>
              </CopyToClipboard>
            </div>
            <div
              className={styles.subcontent}
              style={{ color: theme.commentText }}
            >
              <b>
                Send only Waves based cryptocurrencies or Assets to this wallet
                address.
              </b>
              <br />
              Your account will automatically update after the cryptocurrency
              network confirms your transaction. The confirmation takes only few
              minutes. You can track all the transactions directly on the{" "}
              <div
                className={styles.explorer}
                onClick={toExplorer}
                style={{ color: theme.primaryText }}
              >
                Explorer
              </div>
              .
            </div>
          </div>
        </div>
      </div>
      <div className={styles.transactionList}>
        <Transaction
          transactions={transactions}
          title="Latest Transaction"
          owner={walletState.address}
        />
      </div>
    </div>
  );
}

export default walletContainer(Receive);
