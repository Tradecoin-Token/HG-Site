import { Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import styles from "./Home.module.scss";
import About from "assets/images/lockitty-about.svg";
import WithDraw from "assets/images/withdraw.svg";

const Home = () => {
  const steps = [
    {
      name: "First Withdrawal",
      duration: "2 mins after deposit",
      bgColor: "rgba(0, 4, 81, 0.4)",
      border: "0.6px solid rgba(254, 0, 108, 0.5)",
    },
    {
      name: "Second Withdrawal",
      duration: "24hrs minimum after first withdrawal",
      bgColor: "rgba(254, 0, 108, 0.4)",
      border: "0.4px solid rgba(254, 0, 108, 0.5)",
    },
    {
      name: "Third Withdrawal",
      duration: "24hrs mininimum after second withdrawal",
      bgColor: "rgba(0, 4, 81, 0.3)",
      border: "0.4px solid rgba(254, 0, 108, 0.4)",
    },
    {
      name: "First Withdrawal",
      duration: "24 hrs minimum after third withdrawal",
      bgColor: "rgba(103, 0, 255, 0.6)",
      border: "0.4px solid rgba(254, 0, 108, 0.5)",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <div className={styles.tip}>
          <div className={styles.heading}>
            <div className={styles.h1}>About Lockityy</div>
            <div className={styles.h2}>
              Liquidity Management Protocol for Traders
            </div>
          </div>
          <div className={styles.content}>
            Lockityy locks your BUSD deposit and you can withdraw it in 4 equal
            amounts based on the following schedule below. Also you can only
            deposit only after all previous deposits have been withdrawn.
          </div>
        </div>
        <div className={styles.image}>
          <img src={About} alt="About" />
        </div>
      </div>
      <div className={styles.work}>
        <h6 className={styles.heaing}>How it works</h6>
        <div className={styles.steps}>
          {steps.map(({ name, duration, bgColor, border }, index) => (
            <div
              className={styles.step}
              key={index}
              style={{
                background: bgColor,
                border,
              }}
            >
              <div className={styles.image}>
                <img src={WithDraw} alt="Withdraw" />
              </div>
              <div className={styles.stepName}>{name}</div>
              <div className={styles.comment}>{duration}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.subscribe}>
        <div className={styles.header}>Stay Updated</div>
        <div className={styles.comment}>Get emails straight to your inbox</div>
        <InputGroup className={styles.emailContainer}>
          <Input isRequired placeholder="Email Address" type="email" />
          <InputRightAddon>
            <Button>Subscribe&nbsp;&nbsp;&nbsp;&rarr;</Button>
          </InputRightAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default Home;
