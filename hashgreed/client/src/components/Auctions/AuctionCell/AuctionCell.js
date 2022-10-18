import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/all";
import styles from "./AuctionCell.module.scss";
import { ThemeContext } from "context/ThemeContext";
import walletContainer from "redux/containers/wallet";
import WavesUtils from "utils/waves";

const AuctionCell = ({ category, auction, height, bidOpen, walletState }) => {
  const { theme } = useContext(ThemeContext);
  const owner = walletState.address;
  const isOwner = auction.winner
    ? owner === auction.winner
    : owner === auction.organizer;

  const [price, setPrice] = useState({
    name: "",
    decimals: 0,
    description: "",
  });

  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);

  const isLive = category === "live";

  const getReactionState = async (auctionId, address) => {
    const result = await axios.post("/api/reactions/status", {
      auctionId,
      address,
    });
    if (result.status !== 200) return;
    const { count, like } = result.data;
    setLike(like);
    setCount(count);
  };

  const onReact = async (auctionId, address) => {
    await axios.post("/api/reactions/react", {
      auctionId,
      address,
      like: !like,
    });
    await getReactionState(auctionId, address);
  };

  useEffect(() => {
    if (auction.price_id) {
      WavesUtils.getAssetInfo(auction.price_id, setPrice);
    }
  }, [auction.price_id]);

  useEffect(() => {
    getReactionState(auction.id, walletState.address);
  }, [walletState.address, auction.id]);

  return (
    <div
      className={styles.auctionCell}
      key={auction.id}
      style={{ backgroundColor: theme.stepBackground }}
    >
      <div className={styles.title} style={{ color: theme.commentText }}>
        {auction.assetName}
      </div>
      <div className={styles.clientName} style={{ color: theme.primaryText }}>
        {auction.assetName}
      </div>
      <div className={styles.photo}>
        <img
          src={`https://ipfs.io/ipfs/${auction.avatar}`}
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.reactions}>
        <div onClick={() => onReact(auction.id, walletState.address)}>
          {like ? (
            <FaHeart color={theme.buttonBack} size="16px" />
          ) : (
            <FaRegHeart color={theme.buttonBack} size="16px" />
          )}
        </div>
        <span>{`${count} Like(s)`}</span>
      </div>

      <div className={styles.bidarea}>
        <div className={styles.startPrice}>
          <div className={styles.value} style={{ color: theme.primaryText }}>
            {price.name} {auction.price / 10 ** price.decimals}
          </div>
          <div
            className={styles.starttitle}
            style={{ color: theme.commentText }}
          >
            Starting From
          </div>
        </div>

        <span
          className={styles.button}
          style={
            isLive
              ? {
                  background: theme.buttonBack,
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: 700,
                  padding: "5px 12px",
                }
              : { color: theme.primaryText }
          }
          onClick={() => bidOpen(auction)}
        >
          {category === "live"
            ? "Bid Now"
            : category === "expired" && isOwner
            ? "Withdraw"
            : category === "soldout" && auction.organizer === auction.operator
            ? "WithDrawn"
            : category === "soldout" && auction.organizer !== auction.operator
            ? "SoldOut"
            : "view"}
        </span>
      </div>
    </div>
  );
};

export default walletContainer(AuctionCell);
