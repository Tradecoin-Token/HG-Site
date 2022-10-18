import { Button } from "@chakra-ui/react";
import styles from "./About.module.scss";
import LOGO from "assets/images/alias/about.svg";

const About = ({ toCreate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.about}>
          <div className={styles.heading}>About Alias</div>
          <div className={styles.content}>
            Alias is a nickname of your address, you can use an alias instead of
            an address to make transactions. Your alias must be between 4 and 30
            characters long and must contain only lowercase latin letters,
            digits and symbols (@, -,_) and dot
          </div>
          <Button
            className={styles.createButton}
            onClick={() => {
              toCreate && toCreate();
            }}
          >
            Create Alias
          </Button>
        </div>
        <div className={styles.logo}>
          <img src={LOGO} alt="" />
        </div>
      </div>
      <div className={styles.fee}>Transaction fee : 0.001 Waves</div>
    </div>
  );
};

export default About;
