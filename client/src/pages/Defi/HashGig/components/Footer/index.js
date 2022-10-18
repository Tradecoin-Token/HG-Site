import styles from "./Footer.module.scss";
import LOGO from "assets/images/hashgig/logo.svg";

const Footer = ({ menuItems, menuIndex, selectMenu }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={LOGO} alt="" className={styles.logoImg} />
        <div className={styles.title}>HashGig</div>
      </div>
      <div className={styles.main}>
        <div className={styles.menu}>
          {menuItems.map((item, index) => (
            <button
              style={{ display: "flex", flexDirection: "row" }}
              key={index}
            >
              {index ? <div className={styles.divider}>|</div> : <></>}
              <div
                className={index === menuIndex ? styles.active : ""}
                onClick={() => {
                  selectMenu(index);
                }}
              >
                {item}
              </div>
            </button>
          ))}
        </div>
        <div className={styles.comment}>
          Our application uses Waves Signer to connect your account and sign all
          transactions. To import an existing account, do it first at
          waves.exchange. Our Web Application never has any access to your
          private key or secret seed words, all your accounts should be managed
          at waves.exchange. Never enter your private key or secret seed words
          in any 3rd party application.
        </div>
      </div>
    </div>
  );
};
export default Footer;
