import React, { useState, useEffect, useContext } from "react";

import { Input } from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/all";
import walletContainer from "redux/containers/wallet";
import _ from "lodash";
import WAValidator from "multicoin-address-validator";
import WavesConfig from "config/waves";
import WavesUtils from "utils/waves";
import AlertUtils from "utils/alert";

import cx from "classnames";
import ApiUtils from "utils/api";
import styles from "./MassSend.module.scss";
import Transaction from "components/Transaction/Transaction";
import { ThemeContext } from "context/ThemeContext";

import PaymentTokenSelector from "components/CurrencySelector/PaymentTokenSelector";

function MassSend({ walletState, walletActions }) {
  const [transactions, setTransactions] = useState([]);
  const emptyRecipient = { address: "", amount: "" };
  const [recipients, setRecipients] = useState([_.cloneDeep(emptyRecipient)]);
  const [comment, setComment] = useState("");
  const [massSendFee, setMassSendFee] = useState(0.001);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (walletState.address) {
      const proc = () => {
        ApiUtils.getMassTransactions(walletState.address, setTransactions);
      };
      proc();
    }
  }, [walletState.address]);

  const addNewRecipient = () => {
    let fee = Number(massSendFee);
    setRecipients([...recipients, _.cloneDeep(emptyRecipient)]);
    fee = fee + 0.001;
    setMassSendFee(fee);
  };
  const removeRecipient = (index) => {
    let fee = Number(massSendFee);
    const newRecipients = _.cloneDeep(recipients);
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);

    if (massSendFee > 0.001) fee = fee - 0.001;
    setMassSendFee(fee.toFixed(3));
  };
  const setRecipientAddress = (index, value) => {
    const newRecipients = _.cloneDeep(recipients);
    newRecipients[index].address = value;
    setRecipients(newRecipients);
  };
  const setRecipientAmount = (index, value) => {
    const newRecipients = _.cloneDeep(recipients);
    newRecipients[index].amount = value;
    setRecipients(newRecipients);
  };

  const [assetId, setAssetId] = useState("");
  const confirmTransfer = () => {
    var total = 0;
    if (assetId === "") {
      AlertUtils.SystemAlert("Please select currency");
      return;
    }
    for (var i = 0; i < recipients.length; ++i) {
      if (
        !WAValidator.validate(
          recipients[i].address,
          "waves",
          WavesConfig.WAVES_PLATFORM
        ) &&
        WavesUtils.getAddressByAlias(recipients[i]) === ""
      ) {
        AlertUtils.SystemAlert(
          `#${i + 1} - "${recipients[i]}" is not a valid address`
        );
        return;
      }
      if (isNaN(recipients[i].amount) || recipients[i].amount <= 0) {
        AlertUtils.SystemAlert("#" + (i + 1) + " Amount is not valid");
        return;
      }
      total += Number(recipients[i].amount);
    }
    if (
      isNaN(total) ||
      total <= 0 ||
      total > WavesUtils.getBalanceFromAssetId(walletState, assetId)
    ) {
      AlertUtils.SystemAlert("Amount is not valid");
      return;
    }
    WavesUtils.masssend(recipients, comment, assetId);
  };
  return (
    <div className={styles.masssend}>
      <div className={styles.container}>
        <div className={styles.transfer} style={{ color: theme.primaryText }}>
          <div className={styles.transfertitle}>Mass Transfer</div>
          <div style={{ minWidth: 200 }}>
            <PaymentTokenSelector handleChange={setAssetId} />
          </div>
        </div>
        <hr className={styles.border} />
        <div className={styles.massTransfer}>
          {recipients.map((recipient, index) => (
            <div
              className={styles.recipient}
              key={index}
              style={{ background: theme.itemBackground }}
            >
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
                  value={recipient.address}
                  variant="flushed"
                  onChange={(e) => setRecipientAddress(index, e.target.value)}
                />
              </div>
              <div className={styles.amount}>
                <div
                  className={styles.inputTitle}
                  style={{ color: theme.commentText }}
                >
                  Amount
                </div>
                <div className={styles.valueGroup}>
                  <Input
                    className={styles.value}
                    value={recipient.amount}
                    style={{ color: theme.primaryText }}
                    variant="flushed"
                    onChange={(e) => setRecipientAmount(index, e.target.value)}
                  />
                  {index === recipients.length - 1 ? (
                    <FaPlusCircle
                      className={styles.cursor}
                      size={30}
                      onClick={addNewRecipient}
                      style={{ color: theme.plusCircle }}
                    />
                  ) : (
                    <FaMinusCircle
                      className={styles.cursor}
                      size={30}
                      onClick={() => removeRecipient(index)}
                      style={{ color: theme.plusCircle }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
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
              style={{ color: theme.primaryText }}
              value={comment}
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
                {massSendFee} Waves
              </div>
            </div>
            <div
              className={cx(styles.button, styles.filled)}
              style={{ backgroundColor: theme.buttonBack }}
              onClick={confirmTransfer}
            >
              Confirm mass transfer
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

export default walletContainer(MassSend);
