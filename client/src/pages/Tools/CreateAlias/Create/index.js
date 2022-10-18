import React, { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import LOGO from "assets/images/alias/create.svg";
import styles from "./Create.module.scss";
import { Button, Input } from "@chakra-ui/react";
import WavesUtils from "utils/waves";
import walletContainer from "redux/containers/wallet";
import AlertUtils from "utils/alert";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaPaste } from "react-icons/fa";

const Create = ({ toAbout, walletState }) => {
  const { theme } = useContext(ThemeContext);
  const [alias, setAlias] = React.useState("");
  const [aliases, setAliases] = React.useState([]);

  const onCreate = async () => {
    const result = await WavesUtils.createAlias(walletState.address, alias);
    if (result) {
      AlertUtils.SystemAlert(
        "Successfully create an alias for your wallet address."
      );
      toAbout && toAbout();
    }
  };

  React.useEffect(() => {
    const loadAliases = async () => {
      const aliasList = await WavesUtils.getAliasList(walletState.address);
      setAliases(aliasList);
    };
    loadAliases();
  }, [walletState.address]);

  return (
    <div className={styles.container}>
      <div className={styles.create}>
        <div className={styles.title}>Alias Created</div>
        <div className={styles.heading}>Your address</div>
        <div className={styles.address}>
          <div>{walletState.address}</div>
          <CopyToClipboard text={walletState.address}>
            <FaPaste
              className={styles.copyIcon}
              style={{ color: theme.iconBack }}
            />
          </CopyToClipboard>
        </div>
        <div className={styles.heading}>Aliases</div>
        {aliases.length === 0 ? (
          <div>You don't have any alises for your address.</div>
        ) : (
          aliases.map((alias, index) => (
            <>
              <div className={styles.address} key={index}>
                <div>{alias}</div>
                <CopyToClipboard text={alias}>
                  <FaPaste
                    className={styles.copyIcon}
                    style={{ color: theme.iconBack }}
                  />
                </CopyToClipboard>
              </div>
              <hr className={styles.divider} />
            </>
          ))
        )}
        <div className={styles.heading}>Enter Nickname</div>
        <Input
          className={styles.input}
          placeholder="Enter nickname  for your hashgreed address"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <div className={styles.comment}>
          character 4-30 long and can include lowercase latin letter, digits and
          symbols (@.-,_,.)
        </div>
        <Button className={styles.button} onClick={onCreate}>
          Create
        </Button>
      </div>
      <div className={styles.logo}>
        <img src={LOGO} alt="" />
      </div>
      <div className={styles.fee}>Transaction fee : 0.001 Waves</div>
    </div>
  );
};

export default walletContainer(Create);
