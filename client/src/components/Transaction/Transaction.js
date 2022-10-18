import React, { useContext, useState } from "react";

import styles from "./Transaction.module.scss";
import { ThemeContext } from "context/ThemeContext";
import TransactionCell from "./TransactionCell/TransactionCell";
import WavesConfig from "config/waves";
import Prev from "assets/images/left.png";
import Next from "assets/images/right.png";

function Transaction({ transactions, title, owner }) {
  const { theme } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);

  return transactions && transactions.length > 0 ? (
    <div
      className={styles.transactions}
      style={{ backgroundColor: theme.stepBackground }}
    >
      <div className={styles.CarouselArea}>
        <div className={styles.header}>
          <div className={styles.titleBar}>
            <div className={styles.title} style={{ color: theme.primaryText }}>
              {title}
            </div>
            <a
              className={styles.view}
              href={
                index < transactions.length
                  ? `${WavesConfig.EXPLORER_URL}/tx/${transactions[index].data.id}`
                  : ""
              }
              target="_blank"
              rel="noreferrer"
            >
              View more
            </a>
          </div>
          <hr className={styles.line} />
        </div>
        <div className={styles.mainCarousel}>
          <img
            src={Prev}
            className={styles.leftIcon}
            style={{ color: theme.primaryText }}
            onClick={() => {
              if (index) setIndex(index - 1);
            }}
            alt=""
          />
          <TransactionCell transaction={transactions[index]} owner={owner} />
          <img
            src={Next}
            className={styles.rightIcon}
            onClick={() => {
              if (index < transactions.length - 1) setIndex(index + 1);
            }}
            alt=""
          />
        </div>
      </div>
    </div>
  ) : null;
}

export default Transaction;
