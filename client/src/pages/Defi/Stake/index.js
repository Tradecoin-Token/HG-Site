import React, { useEffect, useState, useContext } from "react";

import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import cx from "classnames";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import walletContainer from "redux/containers/wallet";
import WavesUtils from "utils/waves";
import styles from "./Stake.module.scss";
import { ThemeContext } from "context/ThemeContext";
import BUSD from "assets/icons/BUSD.svg";
import KUSD from "assets/icons/KUSD.svg";

function Stake({ walletState }) {
  const [staked, setStaked] = useState(0.0);
  const [sendAmount, setSendAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (walletState.address) {
      const proc = () => {
        WavesUtils.StakedBUSD(walletState.address, setStaked);
      };
      proc();
    }
  }, [walletState.address]);

  const Deposit = () => {
    if (sendAmount > 5 && sendAmount <= walletState.busd_balance) {
      WavesUtils.DepositBUSD(parseInt(sendAmount));
      WavesUtils.StakedBUSD(walletState.address, setStaked);
    }
  };

  const Withdraw = () => {
    if (receiveAmount > 0 && receiveAmount <= staked) {
      WavesUtils.WithdrawKUSD(parseInt(receiveAmount));
      WavesUtils.StakedBUSD(walletState.address, setStaked);
    }
  };

  return (
    <div className={styles.stake}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            className={styles.stakeTitle}
            style={{ color: theme.primaryText }}
          >
            Stake <div className={styles.depositTitle}>Deposit</div>
          </div>
          <div
            className={styles.totalStaked}
            style={{ color: theme.primaryText }}
          >
            {" "}
            Total Staked: {staked} BUSD
          </div>
        </div>
        <hr className={styles.border} />
        <div>
          <h3>
            Stack minimum of <b>15 BUSD</b>
          </h3>
        </div>
        <Flex className={styles.stats} style={{ color: theme.primaryText }}>
          <Stat color="#000451">
            <StatLabel style={{ color: theme.primaryText }}>Daily</StatLabel>
            <StatNumber style={{ color: theme.primaryText }}>
              {((sendAmount * 0.014) / 100).toFixed(2)}
            </StatNumber>
            <StatHelpText style={{ color: theme.primaryText }}>
              0.014%
            </StatHelpText>
          </Stat>
          <Stat color="#000451">
            <StatLabel style={{ color: theme.primaryText }}>Weekly</StatLabel>
            <StatNumber style={{ color: theme.primaryText }}>
              {((sendAmount * 0.097) / 100).toFixed(2)}
            </StatNumber>
            <StatHelpText style={{ color: theme.primaryText }}>
              0.097%
            </StatHelpText>
          </Stat>
          <Stat color="#000451">
            <StatLabel style={{ color: theme.primaryText }}>Monthly</StatLabel>
            <StatNumber style={{ color: theme.primaryText }}>
              {((sendAmount * 0.416) / 100).toFixed(2)}
            </StatNumber>
            <StatHelpText style={{ color: theme.primaryText }}>
              0.416%
            </StatHelpText>
          </Stat>
          <Stat color="#000451">
            <StatLabel style={{ color: theme.primaryText }}>Yearly</StatLabel>
            <StatNumber style={{ color: theme.primaryText }}>
              {((sendAmount * 5) / 100).toFixed(2)}
            </StatNumber>
            <StatHelpText style={{ color: theme.primaryText }}>5%</StatHelpText>
          </Stat>
        </Flex>

        <div className={styles.sliderarea}>
          <NumberInput
            allowMouseWheel
            className={styles.numInput}
            max={walletState.busd_balance}
            min={0}
            mr="1rem"
            ml="1rem"
            value={sendAmount}
            onChange={(value) => setSendAmount(value)}
            step={0.1}
            isDisabled={walletState.busd_balance === 0}
          >
            <div className={styles.numberarea}>
              <div className={styles.title}>Amount</div>
              <NumberInputField
                className={styles.numberField}
                borderWidth="0"
                color="ActiveBorder: #f1eef0"
                borderInlineEndColor="#f1eef0"
                focusBorderColor="#f1eef0"
              />
            </div>
            <NumberInputStepper>
              <NumberIncrementStepper
                color=" rgba(0, 4, 81, 0.5)"
                fontSize="24px"
              />
              <NumberDecrementStepper
                color=" rgba(0, 4, 81, 0.5)"
                fontSize="24px"
              />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            flex="7"
            focusThumbOnChange={false}
            value={sendAmount}
            onChange={(value) => setSendAmount(value)}
            max={walletState.busd_balance}
            step={0.1}
            ml="1.2rem"
            mr="1rem"
            isDisabled={walletState.busd_balance === 0}
          >
            <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full">
              <SliderFilledTrack
                bg="linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)"
                p={1.5}
                borderRadius="full"
              />
            </SliderTrack>
            <SliderThumb
              className={styles.sliderThumb}
              fontSize="26px"
              boxSize="28px"
              boxShadow=""
            />
          </Slider>
          <span
            className={cx(
              styles.button,
              walletState.busd_balance === 0 ? styles.disabled : styles.filled
            )}
            style={{ backgroundColor: theme.buttonBack }}
            onClick={walletState.busd_balance === 0 ? null : Deposit}
          >
            <div>Deposit</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              BUSD
              <img src={BUSD} alt="BUSD" width="24px" height="24px" />
            </div>
          </span>
        </div>
        <div className={styles.sliderarea}>
          <NumberInput
            allowMouseWheel
            className={styles.numInput}
            max={staked}
            min={0}
            mr="1rem"
            ml="1rem"
            value={receiveAmount}
            onChange={(value) => setReceiveAmount(value)}
            step={0.1}
            isDisabled={staked === 0}
          >
            <div className={styles.numberarea}>
              <div className={styles.title}>Amount</div>
              <NumberInputField
                className={styles.numberField}
                borderWidth="0"
                color="ActiveBorder: #f1eef0"
                borderInlineEndColor="#f1eef0"
                focusBorderColor="#f1eef0"
              />
            </div>
            <NumberInputStepper>
              <NumberIncrementStepper
                color=" rgba(0, 4, 81, 0.5)"
                fontSize="24px"
              />
              <NumberDecrementStepper
                color=" rgba(0, 4, 81, 0.5)"
                fontSize="24px"
              />
            </NumberInputStepper>
          </NumberInput>

          <Slider
            flex="7"
            focusThumbOnChange={false}
            value={receiveAmount}
            onChange={(value) => setReceiveAmount(value)}
            max={staked}
            step={0.1}
            ml="1.2rem"
            mr="1rem"
            isDisabled={staked === 0}
          >
            <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full">
              <SliderFilledTrack
                bg="linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)"
                p={1.5}
                borderRadius="full"
              />
            </SliderTrack>
            <SliderThumb fontSize="26px" boxSize="28px" boxShadow="" />
          </Slider>
          <span
            className={cx(
              styles.button,
              staked === 0 ? styles.disabled : styles.filled
            )}
            style={{ backgroundColor: theme.buttonBack }}
            onClick={staked === 0 ? null : Withdraw}
          >
            <div>Withdraw</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              KUSD
              <img src={KUSD} alt="BUSD" width="24px" height="24px" />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default walletContainer(Stake);
