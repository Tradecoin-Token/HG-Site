import { Link } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaPaste } from "react-icons/fa";
import WavesConfig from "config/waves";
import styles from "./Table.module.scss";

/**
 * Table component for showing list of deposits, payments, gigs
 * @param {header} list of table header items {name, icon, align}
 * @param {data} table data
 * @returns
 */

const Table = ({ header, data }) => {
  const flex = {
    left: "flex-start",
    right: "flex-end",
    center: "center",
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {header.map(({ name, icon }, index) => (
          <div className={styles.headerItem} key={index}>
            <div>
              <Icon icon={icon} className={styles.icon} />
            </div>
            <div className={styles.name}>{name}</div>
          </div>
        ))}
      </div>
      {data.length === 0 ? (
        <div className={styles.empty}>No data available</div>
      ) : (
        <div className={styles.contents}>
          {data.map((item, index) => (
            <div className={styles.row} key={`row_${index}`}>
              {item.map((value, colIndex) => (
                <div
                  className={styles.col}
                  style={{
                    justifyContent: flex[header[colIndex].align ?? "left"],
                    textAlign: header[colIndex].align ?? "left",
                  }}
                  key={`col_${colIndex}`}
                >
                  {!header[colIndex].link ? (
                    value
                  ) : (
                    <>
                      <Link href={`${WavesConfig.EXPLORER_URL}/tx/${value}`}>
                        {value.substring(0, 5) + ".."}
                      </Link>
                      <CopyToClipboard text={value}>
                        <div>
                          <FaPaste />
                        </div>
                      </CopyToClipboard>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
