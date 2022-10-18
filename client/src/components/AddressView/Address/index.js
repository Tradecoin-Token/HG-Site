import React, { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import styles from "./Address.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaPaste, FaWallet } from "react-icons/all";
function Address({
  title,
  icon,
  value,
  price,
  isBalance = true,
  isCopy = false,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.address} style={{ color: theme.primaryText }}>
      <div className={styles.header} style={{ color: theme.primaryText }}>
        {title}
      </div>
      <div className={styles.amount}>
        <div>
          <FaWallet size="16px" color={theme.iconBack} />
        </div>
        <div className={styles.value} style={{ color: theme.primaryText }}>
          {!isBalance
            ? value.slice(0, 5) + "..."
            : parseFloat(value).toFixed(4)}
          {isCopy ? (
            <CopyToClipboard text={value}>
              <div>
                <FaPaste
                  className={styles.action}
                  style={{ color: theme.iconBack }}
                />
              </div>
            </CopyToClipboard>
          ) : (
            <></>
          )}
        </div>
      </div>
      {price !== undefined ? (
        <div className={styles.price} style={{ color: theme.primaryText }}>
          Current Price:{" "}
          <span className={styles.value}>USD {price.toFixed(4)}</span>
        </div>
      ) : null}

      <img src={icon} alt="" className={styles.imgMob} />
      <div className={styles.contentMob}>
        <div className={styles.valueMob}>
          <div style={{ color: theme.primaryText }}>{title}</div>
          &nbsp;&nbsp;&nbsp;
          {!isBalance ? (
            <CopyToClipboard text={value} style={{ color: theme.buttonBack }}>
              <FaCopy size="12px" />
            </CopyToClipboard>
          ) : (
            // <img src={copy} alt="" className={styles.imgMobIco}/>
            <div className={{}} style={{ color: theme.primaryText }}>
              {parseFloat(value).toFixed(4)}
            </div>
          )}
        </div>
        {price !== undefined ? (
          <div className={styles.priceMob} style={{ color: theme.primaryText }}>
            Current Price:{" "}
            <span className={styles.priceMobB}>USD {price.toFixed(4)}</span>
          </div>
        ) : !isBalance ? (
          <div className={styles.valueMob} style={{ color: theme.primaryText }}>
            {value.slice(0, 26) + "..."}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Address;
