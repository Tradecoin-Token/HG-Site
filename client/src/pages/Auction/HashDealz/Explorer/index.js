import React, { useEffect, useState, useContext } from "react";

import styles from "./Explorer.module.scss";
import Auction from "components/Auctions/Auction/Auction";

import ApiUtils from "utils/api";
import walletContainer from "redux/containers/wallet";
import { ThemeContext } from "context/ThemeContext";
import { useHashDealz } from "hooks/useHashDealz";

function Explorer({ walletState }) {
  const [auctions, setAuctions] = useState([]);
  const [height, setHeight] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { type, label } = useHashDealz();
  const auctionType = `HashDealz/${type}`;

  useEffect(() => {
    let interval = -1;
    if (walletState.address) {
      const proc = () => {
        ApiUtils.getAuctions(
          walletState.address,
          auctionType,
          setAuctions,
          setHeight
        );
      };
      proc();
    }

    return () => {
      if (interval > -1) {
        clearInterval(interval);
      }
    };
  }, [walletState.address, auctionType]);

  return (
    <div className={styles.explorer}>
      <div className={styles.nftType}>
        <div
          className={styles.enabledNFT}
          style={{ color: theme.primaryText, borderColor: theme.buttonBack }}
        >
          {`HashDealz   -   ${label}`}
        </div>
      </div>
      {auctions && auctions.live && auctions.live.length > 0 && (
        <div className={styles.auctionarea}>
          <Auction
            title={"Live Auction"}
            auctionType={"HashDealz"}
            auction={"live"}
            data={auctions.live}
            height={height}
            customer={walletState.address}
          />
        </div>
      )}
      {auctions && auctions.live && auctions.expired.length > 0 && (
        <div className={styles.expiredarea}>
          <Auction
            title={"Expired Auction"}
            auctionType={"HashDealz"}
            auction={"expired"}
            data={auctions.expired}
            height={height}
            customer={walletState.address}
          />
        </div>
      )}
      {auctions && auctions.live && auctions.soldout.length > 0 && (
        <div className={styles.soldoutarea}>
          <Auction
            title={"Soldout/Withdrawn Auction"}
            auctionType={"HashDealz"}
            auction={"soldout"}
            data={auctions.soldout}
            height={height}
            customer={walletState.address}
          />
        </div>
      )}
    </div>
  );
}
export default walletContainer(Explorer);
