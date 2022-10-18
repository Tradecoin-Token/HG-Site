import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import BUSD from "assets/icons/BUSD.svg";
import { ThemeContext } from "context/ThemeContext";
import walletContainer from "redux/containers/wallet";
import WavesConfig from "config/waves";
import styles from "./Withdrawal.module.scss";
import Info from "../components/Info";
import WavesUtils from "utils/waves";
import AlertUtils from "utils/alert";

const STATE = {
  Loading: 0,
  Deposit: 1,
  Wait: 2,
  NoMore: 3,
  Withdraw: 4,
};

const Withdrawal = ({ walletState }) => {
  const { theme } = useContext(ThemeContext);
  const [moneyLeft, setMoneyLeft] = React.useState(0);
  const [numWithdraw, setNumWithdraw] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [state, setState] = React.useState(STATE.Loading);
  const loadData = async () => {
    const { left, count, withdrawBlock } =
      await WavesUtils.lockittyGetWithdrawInfo(walletState.address);
    const lastBlock = await WavesUtils.getLastBlock(Date.now());
    const waitTime = count === 0 ? 2 : 24 * 60;

    setMoneyLeft(left);
    setNumWithdraw(count);

    if (withdrawBlock === null) {
      // should deposit some money first
      setState(STATE.Deposit);
      return;
    }
    const availableFrom = withdrawBlock + waitTime;
    if (count === 3) {
      // cannot withdraw any more
      setState(STATE.NoMore);
    } else if (lastBlock >= availableFrom) {
      setState(STATE.Withdraw);
      setTimeLeft(0);
    } else {
      setState(STATE.Wait);
      setTimeLeft(availableFrom - lastBlock);
    }
  };
  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletState.address]);

  const onWithdraw = async () => {
    const success = await WavesUtils.lockittyWithdraw();
    if (success) AlertUtils.SystemAlert("Withdrawal success!");
    await loadData();
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Withdrawal</div>
      <div className={styles.token}>
        <div className={styles.field}>
          <div className={styles.name}>Token</div>
          <div className={styles.valueContainer}>
            <img
              src={BUSD}
              alt="BUSD"
              style={{ width: "24px", height: "24px" }}
            />
            <span className={styles.value}>BUSD</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            className={styles.button}
            style={{ backgroundColor: theme.buttonBack }}
            isDisabled={state !== STATE.Withdraw}
            onClick={onWithdraw}
          >
            Withdraw
          </Button>
        </div>
      </div>
      <div className={styles.withdrawInfo}>
        <div
          className={styles.infoItem}
          style={{ borderBottom: "none", justifyContent: "center" }}
        >
          <div className={styles.value}>
            {state === STATE.Loading
              ? ""
              : state === STATE.Deposit
              ? "Deposit some money first"
              : state === STATE.Wait
              ? "Your next withdrawal happens in 24hours"
              : state === STATE.NoMore
              ? "You can't withdraw any more"
              : state === STATE.Withdraw
              ? "You can withdraw money right now"
              : ""}
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.name}>{"Total money left : "}</div>
          <div className={styles.value}>
            {`${moneyLeft.toFixed(WavesConfig.BUSD_DECIMALS)} BUSD`}
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.name}>{"Number of withdrawals : "}</div>
          <div className={styles.value}>
            {state > STATE.Deposit ? `${numWithdraw} out of 4` : ""}
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.name}>
            {"Next withdrawal time(Approx.) : "}
          </div>
          <div className={styles.value}>
            {state > STATE.Deposit ? `${timeLeft} minute(s)` : ""}
          </div>
        </div>
        <div
          className={styles.infoItem}
          style={{
            borderBottom: "none",
            justifyContent: "center",
            color: "#707070",
          }}
        >
          <div className={styles.value}>
            Lockitty charges a fixed 1 BUSD withdrawal fee
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <Info text="Withdrawals can only be made two minutes after first deposit and only 25% of your deposit can be withdrawn within 24hours intervals " />
      </div>
    </div>
  );
};

export default walletContainer(Withdrawal);
