import React from "react";
import walletContainer from "redux/containers/wallet";
import LOGO from "assets/images/hashgig/gigs/logo.svg";
import Table from "../components/Table";
import styles from "./Gigs.module.scss";
import WavesUtils from "utils/waves";

const Gigs = ({ walletState }) => {
  const tbHeader = [
    {
      name: "TX ID",
      icon: "akar-icons:arrow-right-left",
      link: true,
      align: "center",
    },
    {
      name: "Scope of work",
      icon: "ph:spiral-bold",
    },
    {
      name: "Deliverables",
      icon: "carbon:delivery-parcel",
      align: "left",
    },
    {
      name: "Freelancer Address",
      icon: "akar-icons:link-chain",
    },
    {
      name: "Deposit",
      icon: "fluent:wallet-credit-card-16-regular",
      align: "center",
    },
    {
      name: "Currency",
      icon: "ant-design:dollar-circle-outlined",
      align: "center",
    },
    {
      name: "Date Created",
      icon: "uiw:date",
      align: "center",
    },
  ];

  const [data, setData] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await WavesUtils.hahsGigGetGigList(walletState.address);
      setData(data);
      setLoading(false);
    };
    loadData();
  }, [walletState.address]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.banner}>
          <div className={styles.title}>HashGig - Gigs</div>
          <img src={LOGO} alt="" className={styles.image} />
        </div>
        <Table header={tbHeader} data={data} loading={loading} />
      </div>
    </div>
  );
};

export default walletContainer(Gigs);
