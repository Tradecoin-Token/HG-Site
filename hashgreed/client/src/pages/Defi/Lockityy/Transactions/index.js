import React from "react";
import WavesUtils from "utils/waves";
import Info from "../components/Info";
import walletContainer from "redux/containers/wallet";
import TransactionList from "../components/TransactionList";
import styles from "./Transactions.module.scss";
const Transactions = ({ walletState }) => {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const loadTransactions = () => {
      setLoading(true);
      WavesUtils.lockittyTransactions(walletState.address, 5, (data) => {
        setTransactions(data);
        setLoading(false);
      });
    };

    loadTransactions();
  }, [walletState.address]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Transactions</div>
      <div className={styles.main}>
        <TransactionList data={transactions} loading={loading} />
      </div>
      <div className={styles.info}>
        <Info text="Withdrawals can only be made two minutes after first deposit and only 25% of your deposit can be withdrawn within 24hours intervals " />
      </div>
    </div>
  );
};

export default walletContainer(Transactions);
