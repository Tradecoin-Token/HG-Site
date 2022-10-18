import styles from "./Info.module.scss";
import { FaInfoCircle } from "react-icons/all";
const Info = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mark}>
        <FaInfoCircle color="#707070" size={45} />
      </div>
      <div className={styles.message}>{text}</div>
    </div>
  );
};

export default Info;
