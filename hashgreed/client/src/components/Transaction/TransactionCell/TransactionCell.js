import React, { useContext } from "react";

import moment from "moment";
import { FaPaste } from "react-icons/all";

import WavesConfig from "config/waves";
import styles from "./TransactionCell.module.scss";
import { ThemeContext } from "context/ThemeContext";
import HASH from "assets/icons/HASH.svg";
import BUSD from "assets/icons/BUSD.svg";
import WAVES from "assets/icons/WAVES.svg";
import KUSD from "assets/icons/KUSD.svg";
import BTC from "assets/icons/BTC.svg";
import USDC from "assets/icons/USDC.svg";
import USDN from "assets/icons/USDN.svg";
import USDT from "assets/icons/USDT.svg";
import RKMT from "assets/icons/RKMT.svg";

import { CopyToClipboard } from "react-copy-to-clipboard";

function TransactionCell({ transaction, owner }) {
  const { theme } = useContext(ThemeContext);

  const assetId = transaction?.data?.assetId;
  const type = transaction.data.sender
    ? transaction.data.sender === owner
      ? "to"
      : "from"
    : transaction.data.type;
  const target =
    transaction.data.sender === owner
      ? transaction.data.recipient
      : transaction.data.sender;
  const title = transaction.data.title;
  const reference = transaction.data.reference;
  const publisher = transaction.data.publisher;
  const timestamp = moment(transaction.data.timestamp).toString();

  const getImageFromAssetId = (assetId) => {
    if (assetId === WavesConfig.RKMT_ID) return RKMT;
    if (assetId === WavesConfig.HASH_ID) return HASH;
    if (assetId === WavesConfig.BUSD_ID) return BUSD;
    if (assetId === WavesConfig.KUSD_ID) return KUSD;
    if (assetId === WavesConfig.BTC_ID) return BTC;
    if (assetId === WavesConfig.USDC_ID) return USDC;
    if (assetId === WavesConfig.USDN_ID) return USDN;
    if (assetId === WavesConfig.USDT_ID) return USDT;
    return WAVES;
  };

  return (
    <div
      className={styles.transaction}
      key={transaction.key}
      style={{
        backgroundColor: theme.stepBackground,
        boxShadow: theme.historyglow,
      }}
    >
      <div className={styles.imageArea}>
        <div className={styles.iconContainer}>
          <img
            src={getImageFromAssetId(assetId)}
            alt=""
            className={styles.icon}
          />
        </div>
        <div className={styles.amount} style={{ color: theme.primaryText }}>
          {type === "fc"
            ? parseFloat(100).toFixed(4)
            : type === "ec"
            ? parseFloat(100).toFixed(4)
            : type === "MA"
            ? parseFloat(300).toFixed(4)
            : parseFloat(transaction.data.amount).toFixed(4)}
        </div>
      </div>
      <div className={styles.dataArea}>
        <div className={styles.timestampArea}>
          <div className={styles.info} style={{ color: theme.primaryText }}>
            {timestamp}
          </div>
          <div className={styles.actions}>
            <div className={styles.amount} style={{ color: theme.primaryText }}>
              {type === "fc"
                ? parseFloat(100).toFixed(4)
                : type === "ec"
                ? parseFloat(100).toFixed(4)
                : type === "MA"
                ? parseFloat(300).toFixed(4)
                : parseFloat(transaction.data.amount).toFixed(4)}
            </div>
          </div>
        </div>
        <div className={styles.references} style={{ color: theme.primaryText }}>
          {type === "to" || type === "from" ? (
            <>
              <b>Transfer {type}: </b>
              {target}
            </>
          ) : type === "fc" ? (
            <>
              <b>File Certification: </b>
              {title}
            </>
          ) : type === "ec" ? (
            <>
              <b>Email Certification: </b>
              {reference}
            </>
          ) : type === "MA" && publisher === owner ? (
            <>
              <b>Agreement request: </b>
              {title}
            </>
          ) : type === "MA" && publisher !== owner ? (
            <>
              <b>Signature requested: </b>
              {title}
            </>
          ) : null}
          <br />
          TXId:{" "}
          <a
            href={`${WavesConfig.EXPLORER_URL}/tx/${transaction.data.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {transaction.data.id}
          </a>
        </div>
        <div
          className={styles.mobreferences}
          style={{ color: theme.primaryText }}
        >
          {type === "to" || type === "from" ? (
            <>
              {target.length > 15 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Transfer {type}: </b>
                    {target.slice(0, 15) + "..."}
                  </div>
                  <CopyToClipboard text={target}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Transfer {type}: </b>
                    {target}
                  </div>
                  <CopyToClipboard text={target}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              )}
            </>
          ) : type === "fc" ? (
            <>
              {title.length > 15 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>File Certification: </b>
                    {title.slice(0, 15) + "..."}
                  </div>
                  <CopyToClipboard text={title}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>File Certification: </b>
                    {title}
                  </div>
                  <CopyToClipboard text={title}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              )}
            </>
          ) : type === "ec" ? (
            <>
              {reference.length > 15 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Email Certification: </b>
                    {reference.slice(0, 15) + "..."}
                  </div>
                  <CopyToClipboard text={reference}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Email Certification: </b>
                    {reference}
                  </div>
                  <CopyToClipboard text={reference}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              )}
            </>
          ) : type === "MA" && publisher === owner ? (
            <>
              {title.length > 15 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Agreement request: </b>
                    {title.slice(0, 15) + "..."}
                  </div>
                  <CopyToClipboard text={title}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Agreement request: </b>
                    {title}
                  </div>
                  <CopyToClipboard text={title}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              )}
            </>
          ) : type === "MA" && publisher !== owner ? (
            <>
              {title.length > 15 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Signature requested: </b>
                    {title.slice(0, 15) + "..."}
                  </div>
                  <CopyToClipboard text={title}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <b>Signature requested: </b>
                    {title}
                  </div>
                  <CopyToClipboard text={title}>
                    <FaPaste
                      className={styles.action}
                      style={{ color: theme.iconBack }}
                    />
                  </CopyToClipboard>
                </div>
              )}
            </>
          ) : null}
          <div>
            {transaction.data.id.length > 15 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  TXId:
                  <a
                    href={`${WavesConfig.EXPLORER_URL}/tx/${transaction.data.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {transaction.data.id.slice(0, 15) + "..."}
                  </a>
                </div>
                <CopyToClipboard text={transaction.data.id}>
                  <FaPaste
                    className={styles.action}
                    style={{ color: theme.iconBack }}
                  />
                </CopyToClipboard>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  TXId:
                  <a
                    href={`${WavesConfig.EXPLORER_URL}/tx/${transaction.data.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {transaction.data.id}
                  </a>
                </div>
                <CopyToClipboard text={transaction.data.id}>
                  <FaPaste
                    className={styles.action}
                    style={{ color: theme.iconBack }}
                  />
                </CopyToClipboard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionCell;
