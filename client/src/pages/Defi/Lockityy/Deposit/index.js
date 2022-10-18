import React, { useContext } from "react";
import { Button, Input } from "@chakra-ui/react";
import BUSD from "assets/icons/BUSD.svg";
import { ThemeContext } from "context/ThemeContext";
import AlertUtils from "utils/alert";
import WavesUtils from "utils/waves";
import Info from "../components/Info";
import styles from "./Deposit.module.scss";

const Deposit = () => {
  const { theme } = useContext(ThemeContext);
  const rates = [
    {
      text: "25%",
      rate: 0.25,
    },
    {
      text: "50%",
      rate: 0.5,
    },
    {
      text: "75%",
      rate: 0.75,
    },
    {
      text: "100%",
      rate: 1.0,
    },
  ];
  const [rateIndex, selectRate] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const onDeposit = async () => {
    const success = await WavesUtils.lockittyDeposit(amount);
    if (success) AlertUtils.SystemAlert("Deposit success!");
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Deposit</div>
      <div className={styles.main}>
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
        <div className={styles.field}>
          <div className={styles.name}>Amount</div>
          <Input
            variant="outline"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            style={{ border: "1px solid #707070", padding: "16px 24px" }}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.proList}>
            {rates.map(({ text }, index) => (
              <div
                className={styles.proItem}
                key={index}
                style={
                  index === rateIndex ? { color: "red", fontWeight: 600 } : {}
                }
                onClick={(e) => selectRate(index)}
              >
                {text}
              </div>
            ))}
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
            onClick={onDeposit}
          >
            Deposit
          </Button>
        </div>
      </div>
      <div className={styles.info}>
        <Info text="All deposits made will be safely locked in your BUSD lockitty account until withdrawal is initiated" />
      </div>
    </div>
  );
};

export default Deposit;
