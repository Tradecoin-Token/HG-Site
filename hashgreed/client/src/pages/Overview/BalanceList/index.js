import walletContainer from "redux/containers/wallet";
import priceContainer from "redux/containers/price";
import HASH from "assets/icons/HASH.svg";
import BUSD from "assets/icons/BUSD.svg";
import WAVES from "assets/icons/WAVES.svg";
import KUSD from "assets/icons/KUSD.svg";
import BTC from "assets/icons/BTC.svg";
import USDC from "assets/icons/USDC.svg";
import USDN from "assets/icons/USDN.svg";
import USDT from "assets/icons/USDT.svg";
import RKMT from "assets/icons/RKMT.svg";
import Balance from "../Balance";
import styles from "./BalanceList.module.scss";

const BalanceList = ({ walletState, priceState }) => {
  const {
    waves_balance,
    busd_balance,
    usdt_balance,
    usdc_balance,
    btc_balance,
    usdn_balance,
    hash_balance,
    kusd_balance,
    rkmt_balance,
  } = walletState;
  const {
    waves_price,
    busd_price,
    usdt_price,
    usdc_price,
    btc_price,
    usdn_price,
    hash_price,
    kusd_price,
    rkmt_price,
  } = priceState;
  const data = [
    {
      title: "Wave Balance",
      icon: WAVES,
      balance: waves_balance,
      price: waves_price,
    },
    {
      title: "BUSD Balance",
      icon: BUSD,
      balance: busd_balance,
      price: busd_price,
    },
    {
      title: "USDT Balance",
      icon: USDT,
      balance: usdt_balance,
      price: usdt_price,
    },
    {
      title: "USDC Balance",
      icon: USDC,
      balance: usdc_balance,
      price: usdc_price,
    },
    {
      title: "BTC Balance",
      icon: BTC,
      balance: btc_balance,
      price: btc_price,
    },
    {
      title: "USDN Balance",
      icon: USDN,
      balance: usdn_balance,
      price: usdn_price,
    },
    {
      title: "HASH Balance",
      icon: HASH,
      balance: hash_balance,
      price: hash_price,
    },
    {
      title: "KUSD Balance",
      icon: KUSD,
      balance: kusd_balance,
      price: kusd_price,
    },
    {
      title: "RKMT Balance",
      icon: RKMT,
      balance: rkmt_balance,
      price: rkmt_price,
    },
  ];

  const totalUsd = data.reduce(
    (sum, item) => sum + item.balance * item.price,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <div className={styles.title}>Total balance:</div>
        <div
          className={styles.value}
          style={{ color: totalUsd ? "green" : "black" }}
        >
          {`$ ${totalUsd.toFixed(4)}`}
        </div>
      </div>
      <div className={styles.balanceList}>
        {data.map((item, index) => (
          <Balance {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default priceContainer(walletContainer(BalanceList));
