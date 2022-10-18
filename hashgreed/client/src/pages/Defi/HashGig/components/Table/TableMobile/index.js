import { Link } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaPaste } from "react-icons/fa";
import WavesConfig from "config/waves";
import styles from "./TableMobile.module.scss";

/**
 * Table component for showing list of deposits, payments, gigs
 * @param {header} list of table header items {name, icon, align}
 * @param {data} table data
 * @returns
 */

const Table = ({ header, data, loading }) => {
  const flex = {
    left: "flex-start",
    right: "flex-end",
    center: "center",
  };
  return (
    <div className={styles.container}>
      {data.length === 0 ? (
        <div className={styles.empty}>No data available</div>
      ) : (
        data.map((item, index) => (
          <div className={styles.item} key={`row_${index}`}>
            {item.map((value, colIndex) => (
              <div
                className={styles.row}
                style={{
                  justifyContent: flex[header[colIndex].align ?? "left"],
                }}
                key={`col_${colIndex}`}
              >
                <div className={styles.label}>
                  <div>
                    <Icon
                      icon={header[colIndex].icon}
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.name}>{header[colIndex].name}</div>
                </div>
                <div className={styles.value}>
                  {!header[colIndex].link ? (
                    value
                  ) : (
                    <>
                      <Link href={`${WavesConfig.EXPLORER_URL}/tx/${value}`}>
                        {value.substring(0, 10) + ".."}
                      </Link>
                      <CopyToClipboard text={value}>
                        <div>
                          <FaPaste />
                        </div>
                      </CopyToClipboard>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Table;
