import walletContainer from "redux/containers/wallet";
import HASH_GIG from "assets/images/hashgig/logo.svg";
import USER from "assets/icons/User.svg";
import styles from "./Header.module.scss";

const Header = ({ walletState, menuItems, menuIndex, selectMenu }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src={HASH_GIG} alt="" className={styles.logoImg} />
          <div className={styles.title}>HashGig</div>
          <img src={USER} alt="" className={styles.profile} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.menu}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={index === menuIndex ? styles.active : ""}
              onClick={() => {
                selectMenu(index);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default walletContainer(Header);
