import React, { useEffect, useState, useContext } from "react";

import cx from "classnames";
import WAValidator from "multicoin-address-validator";
import { Input } from "@chakra-ui/react";

import WavesConfig from "config/waves";
import walletContainer from "redux/containers/wallet";
import WavesUtils from "utils/waves";
import styles from "./Send.module.scss";
import AlertUtils from "utils/alert";
import ApiUtils from "utils/api";
import Transaction from "components/Transaction/Transaction";
import { ThemeContext } from "context/ThemeContext";

import PaymentTokenSelector from "components/CurrencySelector/PaymentTokenSelector";

function Send({ walletState }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [transactions, setTransactions] = useState([]);
  const fee = 0.001;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (walletState.address) {
      const proc = () => {
        ApiUtils.getSendTransactions(walletState.address, setTransactions);
      };
      proc();
    }
  }, [walletState.address]);

  const [assetId, setAssetId] = useState("");

  const confirmTransfer = async () => {
    if (assetId === "") {
      AlertUtils.SystemAlert("Please select currency");
      return;
    }
    if (!WAValidator.validate(recipient, "waves", WavesConfig.WAVES_PLATFORM)) {
      const alias = await WavesUtils.getAddressByAlias(recipient);
      if (alias === "") {
        AlertUtils.SystemAlert(`"${recipient}" is not a valid address`);
        return;
      }
    }

    do {
      if (isNaN(amount) || amount <= 0) break;

      if (amount > WavesUtils.getBalanceFromAssetId(walletState, assetId))
        break;
      await WavesUtils.send(recipient, amount, comment, assetId);
      AlertUtils.SystemAlert("Transfer successful!");
      return;
    } while (false);

    AlertUtils.SystemAlert("Amount is not valid");
  };
  return (
    <div className={styles.send}>
      <div className={styles.container}>
        <div className={styles.transfer} style={{ color: theme.primaryText }}>
          <div className={styles.transfertitle}>Transfer</div>
          <div style={{ minWidth: 200 }}>
            <PaymentTokenSelector handleChange={setAssetId} />
          </div>
        </div>
        <hr className={styles.border} />
        <div className={styles.recepient}>
          <div className={styles.address}>
            <div
              className={styles.inputTitle}
              style={{ color: theme.commentText }}
            >
              Recipient Hashgreed Address or Alias
            </div>
            <Input
              className={styles.inputValue}
              style={{ color: theme.primaryText }}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              variant="flushed"
              placeholder=""
            />
          </div>
          <div className={styles.amount}>
            <div
              className={styles.inputTitle}
              style={{ color: theme.commentText }}
            >
              Amount
            </div>
            <Input
              className={styles.inputValue}
              style={{ color: theme.primaryText }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="flushed"
              placeholder=""
            />
          </div>
        </div>
        <div className={styles.confirms}>
          <div className={styles.comment}>
            <div
              className={styles.inputTitle}
              style={{ color: theme.commentText }}
            >
              Comment
            </div>
            <Input
              className={styles.inputValue}
              value={comment}
              style={{ color: theme.primaryText }}
              onChange={(e) => setComment(e.target.value)}
              variant="flushed"
              placeholder=""
            />
            <div
              className={styles.subcomment}
              style={{ color: theme.commentText }}
            >
              This transaction is secure and will open Waves Signer
            </div>
          </div>
          <div className={styles.confirm}>
            <div className={styles.fee}>
              <div className={styles.feetitle} style={{ color: theme.feeText }}>
                Transaction fee:
              </div>
              <div className={styles.feevalue} style={{ color: theme.feeText }}>
                {fee} Waves
              </div>
            </div>
            <div
              className={cx(styles.button, styles.filled)}
              onClick={confirmTransfer}
              style={{ backgroundColor: theme.buttonBack }}
            >
              Confirm transfer
            </div>
          </div>
        </div>
      </div>
      <div className={styles.transactionList}>
        <Transaction
          transactions={transactions}
          title="Latest Transaction"
          owner={walletState.address}
        />
      </div>
    </div>
  );
}

export default walletContainer(Send);
