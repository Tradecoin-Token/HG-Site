import styles from "./Balance.module.scss";
const Balance = ({ title, icon, balance, price }) => {
  return (
    <>
      <div className={styles.balance}>
        <div className={styles.header}>{title}</div>
        <div className={styles.balanceData}>
          <img src={icon} alt="" className={styles.currencyImg} />
          <div className={styles.value}>{balance.toFixed(5)}</div>
        </div>
        <div className={balance ? styles.valueUSD : styles.valueZero}>
          {`($ ${(balance * price).toFixed(4)})`}
        </div>
        <div className={styles.price}>
          <span>Current Price: &nbsp;</span>
          <span className={styles.value}>{`USD ${price.toFixed(4)}`}</span>
        </div>
      </div>
      <div className={styles.balanceMobile}>
        <img src={icon} alt="" className={styles.currencyImg} />
        <div className={styles.value}>{`${title} ${balance.toFixed(4)}`}</div>
        <div className={balance ? styles.valueUSD : styles.valueZero}>
          {`($ ${(balance * price).toFixed(4)})`}
        </div>
        <div className={styles.price}>
          w{`Current Price: USD ${price.toFixed(4)}`}
        </div>
      </div>
    </>
  );
};

export default Balance;
