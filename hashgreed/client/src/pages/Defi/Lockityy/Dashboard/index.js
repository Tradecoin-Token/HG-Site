import React from "react";
import TransactionList from "../components/TransactionList";
import styles from "./Dashboard.module.scss";
import walletContainer from "redux/containers/wallet";
import WavesUtils from "utils/waves";
import WavesConfig from "config/waves";
const Dashboard = ({ onViewTxs, walletState }) => {
  const [amount, setDepositAmount] = React.useState(0);
  const [left, setLeftAmount] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const loadLockittyInfo = async () => {
      const data = await WavesUtils.lockittyGetInfo(walletState.address);
      setDepositAmount(data.deposit);
      setLeftAmount(data.left);
    };

    const loadTransactions = () => {
      setLoading(true);
      WavesUtils.lockittyTransactions(walletState.address, 0, (data) => {
        setTransactions(data);
        setLoading(false);
      });
    };

    loadTransactions();
    loadLockittyInfo();
  }, [walletState.address]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Dashboard</div>
      <div className={styles.main}>
        <div className={styles.balanceInfo}>
          <div
            className={styles.item}
            style={{ background: "#000451", color: "#ffffff" }}
          >
            <div>BUSD Balance</div>
            <div>{`$ ${walletState.busd_balance.toFixed(6)}`}</div>
          </div>
          <div className={styles.item}>
            <div>Amount Deposited</div>
            <div>{`$ ${amount.toFixed(WavesConfig.BUSD_DECIMALS)}`}</div>
          </div>
          <div className={styles.item}>
            <div>Amount Left</div>
            <div>{`$ ${left.toFixed(WavesConfig.BUSD_DECIMALS)} BUSD`}</div>
          </div>
        </div>
        <div className={styles.transactionList}>
          <div className={styles.header}>
            <div className={styles.title}>Transactions</div>
            <button
              className={styles.button}
              onClick={() => {
                onViewTxs && onViewTxs();
              }}
            >
              See all
            </button>
          </div>
          <TransactionList data={transactions} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default walletContainer(Dashboard);
