import React from "react";
import { Button, Input } from "@chakra-ui/react";
import WAValidator from "multicoin-address-validator";
import moment from "moment";
import AlertUtils from "utils/alert";
import WavesUtils from "utils/waves";
import WavesConfig from "config/waves";
import FreelancePaySelector from "components/CurrencySelector/FreelancePaySelector";
import walletContainer from "redux/containers/wallet";
import CIRCLE_1 from "assets/images/hashgig/hire/circle1.svg";
import CIRCLE_2 from "assets/images/hashgig/hire/circle2.svg";
import CIRCLE_3 from "assets/images/hashgig/hire/circle3.svg";
import CIRCLE_4 from "assets/images/hashgig/hire/circle4.svg";
import CIRCLE_5 from "assets/images/hashgig/hire/circle5.svg";
import LANCER from "assets/images/hashgig/hire/lancer.svg";
import CRYPTO from "assets/images/hashgig/hire/crypto.svg";
import TOTAL_DEPOSIT from "assets/images/hashgig/hire/totalDeposit.svg";
import NUM_PAYS from "assets/images/hashgig/hire/numPays.svg";
import LAST_PAY from "assets/images/hashgig/hire/lastPay.svg";
import styles from "./Hire.module.scss";

const Hire = ({ walletState }) => {
  const [scope, setScope] = React.useState("");
  const [deliverable, setDeliverable] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [fund, setFund] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [payCount, setPayCount] = React.useState(0);
  const [assetName, setAssetName] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const [lastTxTime, setLastTxTime] = React.useState("No transactions yet");

  const loadData = async () => {
    const info = await WavesUtils.hashGigGetInfo(walletState.address);
    const { numPays, amount, name, decimals, lastPayTime } = info;
    setPayCount(numPays);
    setAssetName(name);
    setDeposit(amount / 10 ** decimals);
    if (lastPayTime !== "")
      setLastTxTime(moment(lastPayTime).format("DD/MM/YYYY HH:mm:ss"));
    else setLastTxTime("");
  };

  const onDeposit = async () => {
    if (scope === "")
      AlertUtils.SystemAlert("Please enter the scope of work required");
    else if (deliverable === "")
      AlertUtils.SystemAlert(
        "Please enter the deliverables from the freelancer"
      );
    else if (address === "")
      AlertUtils.SystemAlert(
        "Please enter the address of the freelancer's hashgreed address"
      );
    else if (
      WAValidator.validate(address, "waves", WavesConfig.WAVES_PLATFORM) ===
      false
    )
      AlertUtils.SystemAlert("Invalid address");
    else if (tokenId === "") AlertUtils.SystemAlert("Please select token!");
    else if (fund === 0)
      AlertUtils.SystemAlert("Deposit amount cannot be zero");
    else {
      const success = await WavesUtils.hashGigDepositFund(
        scope,
        deliverable,
        address,
        tokenId,
        fund
      );
      if (success) {
        AlertUtils.SystemAlert("Deposit fund success!");

        setScope("");
        setDeliverable("");
        setAddress("");
        setFund("");
        loadData();
      }
    }
  };

  const onPay = async () => {
    if (!amount) AlertUtils.SystemAlert("Please enter amount to pay");
    else {
      const success = await WavesUtils.hashGigPayFreelancer(amount);
      if (success) {
        AlertUtils.SystemAlert("Payment successful!");
        setAmount("");
        loadData();
      }
    }
  };

  React.useEffect(() => {
    loadData();
  }, [walletState.address]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.intro}>
          Anonymous Freelance And DeFi-Enabled Salary Advances
        </div>
        <img src={CIRCLE_1} alt="" className={styles.circle1} />
        <img src={CIRCLE_2} alt="" className={styles.circle2} />
        <img src={CIRCLE_3} alt="" className={styles.circle3} />
        <img src={LANCER} alt="" className={styles.lancer} />
      </div>
      <div className={styles.main}>
        <div className={styles.logoContainer}>
          <img src={CRYPTO} alt="" className={styles.cryptoLogo} />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <div className={styles.heading}>Deposit Fund</div>
            <div className={styles.fields}>
              <div className={styles.field}>
                <div className={styles.name}>Scope of Work</div>
                <Input
                  className={styles.input}
                  placeholder="Enter scope of Work required by user"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                ></Input>
                <div className={styles.comment}>Up to 1,000 characters</div>
              </div>
              <div className={styles.field}>
                <div className={styles.name}>Deliverables</div>
                <Input
                  className={styles.input}
                  placeholder="Enter the deliverables from freelancer"
                  value={deliverable}
                  onChange={(e) => setDeliverable(e.target.value)}
                />
                <div className={styles.comment}>Up to 1,000 characters</div>
              </div>
              <div className={styles.field}>
                <div className={styles.name}>Freelancer Address</div>
                <Input
                  className={styles.input}
                  placeholder="Enter freelancer’s hashgreed address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <div className={styles.name}>Select Currency</div>
                  <div style={{ minWidth: "160px" }}>
                    <FreelancePaySelector
                      handleChange={(value) => setTokenId(value)}
                    />
                  </div>
                </div>
                <Input
                  className={styles.input}
                  placeholder="Enter Amount"
                  type="number"
                  value={fund}
                  onChange={(e) => setFund(parseInt(e.target.value))}
                />
              </div>
              <Button className={styles.btnDeposit} onClick={onDeposit}>
                DEPOSIT FUNDS
              </Button>
              <div className={styles.field}>
                <Input
                  className={styles.input}
                  placeholder="Enter Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                />
              </div>
              <Button className={styles.btnPay} onClick={onPay}>
                PAY NOW
              </Button>
            </div>
          </div>
          <img src={CIRCLE_4} className={styles.circle4} alt="" />
        </div>
        <img src={CIRCLE_5} alt="" className={styles.circle5} />
      </div>
      <div className={styles.info}>
        <div className={styles.section}>
          <img src={TOTAL_DEPOSIT} alt="" className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.name}>Total Deposit</div>
            <div className={styles.value}>{`${deposit} ${assetName}`}</div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.section}>
          <img src={NUM_PAYS} alt="" className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.name}>Number of Payments</div>
            <div className={styles.value}>{`${payCount} out of 12`}</div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.section}>
          <img src={LAST_PAY} alt="" className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.name}>Time Last Payment</div>
            <div className={styles.value}>
              {lastTxTime === "" ? "No transactions yet" : lastTxTime}
            </div>
          </div>
        </div>
        <div className={styles.noticeContainer}>
          <div className={styles.notice}>
            HashGig charges a 5% fee on all Freelancer Payments
          </div>
        </div>
      </div>
    </div>
  );
};

export default walletContainer(Hire);
