import LOGO from "assets/images/hashgig/payments/logo.svg";
import React from "react";
import walletContainer from "redux/containers/wallet";
import WavesUtils from "utils/waves";
import Table from "../components/Table";
import styles from "./Payments.module.scss";

const Payments = ({ walletState }) => {
  const tbHeader = [
    {
      name: "TX ID",
      icon: "akar-icons:arrow-right-left",
    },
    {
      name: "Freelancer Address",
      icon: "akar-icons:link-chain",
    },
    {
      name: "Amount",
      icon: "ant-design:dollar-circle-outlined",
      align: "center",
    },
    {
      name: "Currency",
      icon: "bi:cash-coin",
      align: "center",
    },
    {
      name: "Number of Payment",
      icon: "ri:hand-coin-line",
      align: "center",
    },
    {
      name: "Date",
      icon: "uiw:date",
      align: "center",
    },
  ];
  const [data, setData] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await WavesUtils.hashGigGetPaymentHistory(
        walletState.address
      );
      setData(data);
      setLoading(false);
    };
    loadData();
  }, [walletState.address]);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.banner}>
          <div className={styles.title}>HashGig - Payments</div>
          <img src={LOGO} alt="" className={styles.image} />
        </div>
        <Table header={tbHeader} data={data} loading={loading} />
      </div>
    </div>
  );
};

export default walletContainer(Payments);
