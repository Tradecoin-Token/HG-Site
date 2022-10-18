import React from "react";
import moment from "moment";
import useMediaQuery from "hooks/useMediaQuery";
import BUSD from "assets/icons/BUSD.svg";
import styles from "./TransactionList.module.scss";
import { Spinner } from "@chakra-ui/react";
import { useMobile } from "hooks/useMobile";

const Status = ({ status }) => (
  <div
    className={styles.item}
    style={{
      color:
        status === "Completed"
          ? "#26CF22"
          : status === "Pending"
          ? "#FF0752"
          : "black",
      fontWeight: 600,
    }}
  >
    {status}
  </div>
);

const TransactionList = ({ data, loading }) => {
  const isMobile = useMobile();
  const headers = ["Token", "Amount", "Transaction type", "Date", "Status"];
  return (
    <div className={styles.container}>
      {!isMobile ? (
        <div className={styles.tableHeader}>
          {headers.map((item, index) => (
            <div className={styles.header} key={index}>
              {item}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      {loading ? (
        <div className={styles.loading}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div className={styles.transactionList}>
          {data &&
            data.map((item, index) =>
              !isMobile ? (
                <div className={styles.transaction} key={index}>
                  <div
                    className={styles.item}
                    style={{ justifyContent: "flex-start" }}
                  >
                    <div style={{ width: "24px", height: "24px" }}>
                      <img src={BUSD} alt="BUSD" />
                    </div>
                    <div>BUSD</div>
                  </div>
                  <div className={styles.item}>{item.amount}</div>
                  <div className={styles.item}>{item.type}</div>
                  <div className={styles.item}>
                    {moment(item.timestamp).format("DD/MM/YYYY")}
                  </div>
                  <Status status={item.status} />
                </div>
              ) : (
                <div className={styles.transactionMobile} key={index}>
                  <div className={styles.col1}>
                    <div className={styles.token}>
                      <img src={BUSD} alt="BUSD" />
                    </div>
                    <div className={styles.data}>
                      <div>{item.type}</div>
                      <Status status={item.status} />
                    </div>
                  </div>
                  <div className={styles.data}>
                    <div>{item.amount}</div>
                    <div>{moment(item.timestamp).format("DD/MM/YYYY")}</div>
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
