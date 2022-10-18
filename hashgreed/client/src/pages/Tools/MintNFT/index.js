import React from "react";
import { Button, Input } from "@chakra-ui/react";
import walletContainer from "redux/containers/wallet";
import AlertUtils from "utils/alert";
import WavesUtils from "utils/waves";
import styles from "./MintNFT.module.scss";
import Person1 from "assets/images/person1.svg";
import Person2 from "assets/images/person2.svg";
import Person3 from "assets/images/person3.svg";
import Person4 from "assets/images/person4.svg";
import Puzzle1 from "assets/images/puzzle1.svg";
import Puzzle2 from "assets/images/puzzle2.svg";
import Puzzle3 from "assets/images/puzzle3.svg";
import Puzzle4 from "assets/images/puzzle4.svg";

const Counter = ({ value, setValue }) => {
  return (
    <div className={styles.counter}>
      <Button
        className={styles.decCounter}
        onClick={() => setValue(value - 1)}
        isDisabled={value <= 1}
      >
        -
      </Button>
      <Input
        type="number"
        className={styles.counterContainer}
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          if (newValue <= 0) return;
          setValue(newValue);
        }}
      />
      <Button className={styles.incCounter} onClick={() => setValue(value + 1)}>
        +
      </Button>
    </div>
  );
};
const MintNFT = ({ walletState }) => {
  const [startCounter, setStartCounter] = React.useState(1);
  const [endCounter, setEndCounter] = React.useState(1);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [seriesName, setSeriesName] = React.useState("");

  const onRegister = async () => {
    const validateSeriesInfo = () => {
      if (name === "") return [false, "Enter series name"];
      if (startCounter === 0) return [false, "Start counter is zero"];
      if (endCounter === 0) return [false, "End counter is zero"];
      if (endCounter <= startCounter)
        return [false, "End counter must be greater than start counter"];
      return [true, "success"];
    };
    const [isValid, error] = validateSeriesInfo();
    if (!isValid) {
      AlertUtils.SystemAlert(error);
      return;
    }
    await WavesUtils.registerNFTSeries(
      name,
      description,
      startCounter,
      endCounter
    );
  };

  const onIssue = async () => {
    if (seriesName === "") {
      AlertUtils.SystemAlert("Please enter series name");
      return;
    }
    await WavesUtils.issueNFTSeries(seriesName);
  };

  return (
    <div className={styles.nftMintContainer}>
      <div className={styles.main}>
        <div className={styles.images}>
          <div className={styles.puzzle1}>
            <img src={Puzzle1} alt="" />
          </div>
          <div className={styles.people}>
            <div className={styles.row}>
              <div>
                <img src={Person1} alt="" />
              </div>
              <div>
                <img src={Person2} alt="" />
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <img src={Person3} alt="" />
              </div>
              <div>
                <img src={Person4} alt="" />
              </div>
            </div>
            <div className={styles.black1} />
            <div className={styles.black2} />
          </div>
          <div className={styles.puzzle2_container}>
            <img src={Puzzle2} className={styles.puzzle2} alt="" />
            {/* <div className={styles.bg_black}></div> */}
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.puzzle3}>
            <img src={Puzzle3} alt="" />
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>Mint Your Collection</div>
            <div className={styles.formContent}>
              <div className={styles.field}>
                <div className={styles.fieldName}>Series Name</div>
                <Input
                  placeholder="Enter Series Name"
                  className={styles.inputContainer}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className={styles.comment}>
                  16 Chars Max including Counter
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldName}>Series Description</div>
                <Input
                  placeholder="Enter Series Description"
                  className={styles.inputContainer}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className={styles.comment}>1000 Chars Max</div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldName}>Start Counter:</div>
                <Counter value={startCounter} setValue={setStartCounter} />
              </div>
              <div className={styles.field}>
                <div className={styles.fieldName}>End Counter:</div>
                <Counter value={endCounter} setValue={setEndCounter} />
              </div>
              <div className={styles.note}>
                Note:
                <br />
                * Start Counter cannot be less than 1.
                <br />
                * To issue 1 NFT, Start counter should be 1 and End counter
                should be 2.
                <br />
                * To issue 12 NFTs for example, Start counter should be 1 and
                End counter should be 13.
                <br />
                * That means, always add 1 more to the number of NFTs intended
                at End Counter.
                <br />
              </div>
              <Button className={styles.button} onClick={onRegister}>
                REGISTER
              </Button>
              <div className={styles.field}>
                <div className={styles.fieldName}>Mint Series:</div>
                <Input
                  placeholder="Enter Series Name"
                  className={styles.inputContainer}
                  value={seriesName}
                  onChange={(e) => setSeriesName(e.target.value)}
                />
              </div>
              <Button className={styles.button} onClick={onIssue}>
                ISSUE
              </Button>
            </div>
          </div>
          <div className={styles.puzzle4}>
            <img src={Puzzle4} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default walletContainer(MintNFT);
