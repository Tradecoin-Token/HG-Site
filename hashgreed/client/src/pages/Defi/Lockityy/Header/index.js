import React from "react";
import styles from "./Header.module.scss";
import BUSD from "assets/icons/BUSD.svg";

const Title = ({ isBright }) => {
  return (
    <div className={styles.title}>
      <div
        className={
          // isBright ?
          styles.bright
          // : styles.normal
        }
        style={{ justifyContent: "flex-start" }}
      >
        Lockityy
      </div>
    </div>
  );
};

const Intro = () => {
  return (
    <div className={styles.intro}>
      <div className={styles.introHeader}>
        <span>Grow Your</span>
        &nbsp;
        <span className={styles.token}>BUSD</span>
      </div>
      <div className={styles.introText}>
        Through smart contract enabled disciplined allocation of capital.
        Lockityy gives the traders opportunity to average-in at lower prices on
        their investments
      </div>
      <div className={styles.tokenContainer}>
        <div className={styles.tokenImg}>
          <img src={BUSD} alt="BUSD" />
        </div>
        <div className={styles.tokenName}>BUSD</div>
      </div>
    </div>
  );
};

const Header = ({ menuItems, menuIndex, selectMenu }) => {
  const isHome = menuIndex === 0;
  return (
    <div
      className={styles.headerContainer}
      style={{
        background:
          // isHome?
          "radial-gradient(107.51% 402.95% at 16.53% 9.83%, rgba(0, 4, 81, 0.3) 0%, rgba(254, 0, 108, 0.1) 39.61%, rgba(255, 255, 255, 0.3) 92.44%)",
        // : "white",
      }}
    >
      <div className={styles.header}>
        <Title isBright={isHome} />
        <div className={styles.menu}>
          {menuItems.map((text, index) => (
            <button className={styles.menuItem} key={index}>
              <span
                className={index === menuIndex ? styles.active : styles.normal}
                onClick={() => selectMenu(index)}
              >
                {text}
              </span>
            </button>
          ))}
        </div>
      </div>
      {isHome ? <Intro /> : <></>}
    </div>
  );
};

export default Header;
