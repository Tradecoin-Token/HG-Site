import styles from "./About.module.scss";
import ABOUT from "assets/images/hashgig/about/logo.svg";
import PIECE_1 from "assets/images/hashgig/about/triag1.svg";
import PIECE_2 from "assets/images/hashgig/about/triag2.svg";
import PIECE_3 from "assets/images/hashgig/about/triag3.svg";
import PIECE_4 from "assets/images/hashgig/about/triag4.svg";
import MOBILE_1 from "assets/images/hashgig/about/mobile1.svg";
import MOBILE_2 from "assets/images/hashgig/about/mobile2.svg";
import MOBILE_3 from "assets/images/hashgig/about/mobile3.svg";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <div className={styles.main}>
          <div className={styles.text}>
            <div className={styles.title}>About HashGig!</div>
            <hr className={styles.divider} />
            <div className={styles.content}>
              <p>
                HashGig is a blockchain and smart contracts powered Anonymous
                Freelance application for servicing the $455 Billion Global Gig
                economy.
              </p>
              <p>
                Freelancers who prefer to work anonymously so as to evade racial
                and location prejudices can use Hashgig to safely work with
                clients.
              </p>
            </div>
          </div>
          <img src={ABOUT} alt="About" className={styles.logo} />
          <img src={PIECE_2} alt="" className={styles.piece2} />
        </div>
        <img src={PIECE_1} alt="" className={styles.piece1} />
      </div>
      <div className={styles.section2}>
        <div className={styles.main}>
          <p>
            Clients can also safely hire freelancers and do not have to risk
            paying strangers before deliverables are transferred.
          </p>
          <p>
            Hashgig allows up to 12 payments per deposit. Users can only perform
            one deposit at a time to one freelancer at a time. This allows
            Hashgig to also double as a Smart contract-enabled salary advance
            protocol for helping salaried workers conveniently access peer to
            peer loans which are guaranteed by their salary deposits in the
            smart contract.
          </p>
          <p>
            Disputes are settled by the Hashgig Admin team at the backend and
            funds will be distributed based on agreements.
          </p>
          <img src={PIECE_3} alt="" className={styles.piece3} />
        </div>
        <img src={PIECE_4} alt="" className={styles.piece4} />
        <img src={MOBILE_1} alt="" className={styles.mobile1} />
        <img src={MOBILE_2} alt="" className={styles.mobile2} />
        <img src={MOBILE_3} alt="" className={styles.mobile3} />
      </div>
    </div>
  );
};

export default About;
