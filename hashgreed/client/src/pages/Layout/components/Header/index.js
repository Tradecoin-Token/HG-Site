import React, { useCallback, useContext, useEffect, useRef } from "react";
import cx from "classnames";
import { useHistory } from "react-router-dom";
import {
  AiOutlineQuestion,
  FaBars,
  FaCertificate,
  FaHome,
  HiOutlineLightBulb,
} from "react-icons/all";
import { useDisclosure } from "@chakra-ui/react";

import Drawer from "../Drawer";
import styles from "./Header.module.scss";
import Logo from "assets/images/Header.svg";
import { ThemeContext } from "context/ThemeContext";
import ColorModeSwitcher from "components/ColorModeSwitcher/ColorModeSwitcher";

import walletContainer from "redux/containers/wallet";
import { Icon } from "@iconify/react";

function Header({ walletState, walletActions }) {
  const history = useHistory();
  const account = useCallback(() => history.push("/"), [history]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { theme, setTheme } = useContext(ThemeContext);
  const ref = useRef(null);

  const verification = useCallback(() => history.push("/explorer"), [history]);
  useEffect(() => {
    const googleTranslateElementInit = async () => {
      await new window.google.translate.TranslateElement(
        { pageLanguage: "en", layout: 0 },
        "google_translate_element"
      );
    };
    setTimeout(() => {
      googleTranslateElementInit();
    }, 2000);
  }, []);

  return (
    <div
      className={styles.header}
      style={{ backgroundColor: theme.balancesBack, color: theme.primaryText }}
      ref={ref}
    >
      <div className={styles.image}>
        <FaBars className={styles.drawer} onClick={() => onOpen()} />
        <img src={Logo} alt="" />
      </div>
      <div className={styles.about} style={{ color: theme.commentText }}>
        <a href="/about" className={styles.item}>
          <AiOutlineQuestion size="24px" />
          <div>About</div>
        </a>
        <a href="/faq" className={styles.item}>
          <Icon icon="wpf:faq" width="24px" height="24px" />
          <div>F.A.Q.</div>
        </a>
        <a href="/usecase" className={styles.item}>
          <HiOutlineLightBulb size="24px" />
          <div>Use Cases</div>
        </a>
      </div>
      <div className={styles.menu}>
        <ColorModeSwitcher
          theme={theme}
          setTheme={setTheme}
          className={styles.colorModeSwitcher}
        />
        <span
          className={styles.explorer}
          onClick={walletState.address != null ? verification : null}
          style={{ color: theme.verificationColor }}
        >
          <FaCertificate size="24px" />
          <div>Certification Explorer</div>
        </span>
        <span
          className={cx(styles.account, styles.filled)}
          onClick={account}
          style={{ backgroundColor: theme.buttonBack }}
        >
          <FaHome size="24px" />
          <div>Home</div>
        </span>
      </div>
      <div>
        <span
          className={styles.lang}
          style={{ color: theme.commentText }}
          id="google_translate_element"
        ></span>
        <FaBars className={styles.drawer} onClick={() => onOpen()} />
      </div>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
export default walletContainer(Header);
