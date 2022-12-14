import React, {
  useImperativeHandle,
  forwardRef,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import styles from "./BidModal.module.scss";
import { ThemeContext } from "context/ThemeContext";
import { AiOutlineClose, IoIosCloseCircle } from "react-icons/all";
import WavesUtils from "utils/waves";
import AlertUtils from "utils/alert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import WavesConfig from "config/waves";

const BidModal = ({ auctionData, priceAssetId, customer }, ref) => {
  auctionData = auctionData ? auctionData : {};
  const clipboard = useRef(null);
  const clipboardPrice = useRef(null);

  if (!auctionData.bid) {
    auctionData.bid = 0;
  }
  const { theme } = useContext(ThemeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bid, setBid] = useState("");
  const [imgLink, setImgLink] = useState();
  const [description, setDescription] = useState("");

  const [nft, setNFT] = useState({
    name: "",
    decimals: 0,
    description: "",
  });

  const [price, setPrice] = useState({
    name: "",
    decimals: 0,
    description: "",
  });

  const commentText = "Hashgreed charges 1% fee on all Sport NFT Auctions";

  const Bid = () => {
    if (isNaN(bid) || bid <= 0) {
      AlertUtils.SystemAlert("Bid amount is not valid");
      return;
    } else if (bid <= auctionData.startValue / 10 ** price.decimals) {
      AlertUtils.SystemAlert(
        "Bid amount is must be greater than last winner's amount."
      );
    }
    AlertUtils.SystemAlert(
      "Buying and Selling NFT are subject to risk so better you will do your own research before buying. Be aware of scam assets as we are only a platform to provide services"
    );
    WavesUtils.sportBidAuction(auctionData.id, bid);
    AlertUtils.SystemAlert(
      "You have successfully placed a bid. When someone else places a higher bid, your bid will be returned back to you"
    );
  };

  useEffect(() => {
    WavesUtils.getAssetInfo(priceAssetId, setPrice);
    WavesUtils.getAssetInfo(auctionData.id, setNFT);

    let endDescription = 0;
    let linkstart = 0;
    let linkend = 0;
    let nftDescription = nft.description;
    endDescription = nftDescription.search("IPFS Link:");
    linkstart = nftDescription.search("https://ipfs.io");
    linkend = nftDescription.search("Hash:");
    setDescription(nftDescription.slice(0, endDescription));
    setImgLink(nftDescription.slice(linkstart, linkend));
  }, [priceAssetId, auctionData.id, nft]);

  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
    closeModal() {
      onClose();
    },
  }));

  return (
    <Modal onClose={onClose} size={"5xl"} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        style={{
          borderRadius: "16px",
          boxShadow: " 0px 20px 20px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#F7F9FA",
        }}
        className={styles.modalContent}
      >
        <div
          className={styles.modalArea}
          style={{ backgroundColor: theme.bidModalBackground }}
        >
          <div className={styles.imageArea}>
            <img src={imgLink} className={styles.image} alt="" />
          </div>
          <div
            className={styles.dataArea}
            style={{ backgroundColor: theme.stepBackground }}
          >
            <div className={styles.closeButton}>
              <AiOutlineClose
                className={styles.icon}
                onClick={() => onClose()}
              />
              <IoIosCloseCircle
                className={styles.iconMob}
                onClick={() => onClose()}
              />
            </div>
            <div className={styles.assetArea}>
              <div className={styles.assetDataArea}>
                <div className={styles.nameArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    Name of Asset
                  </div>
                  <div
                    className={styles.value}
                    style={{ color: theme.primaryText }}
                  >
                    {auctionData.name}
                  </div>
                </div>
                <div className={styles.aboutArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    About this Asset
                  </div>
                  <div
                    className={styles.about}
                    style={{ color: theme.primaryText }}
                  >
                    This is the Soccer Player NFT for
                    <br />
                    {auctionData.name}
                  </div>
                </div>
                <div className={styles.priceArea}>
                  <div className={styles.minPriceArea}>
                    <div
                      className={styles.title}
                      style={{ color: theme.commentText }}
                    >
                      Starting/Min price
                    </div>
                    <div
                      className={styles.value}
                      style={{ color: theme.primaryText }}
                    >
                      {price.name}{" "}
                      {auctionData.startValue / 10 ** price.decimals}
                    </div>
                  </div>
                  <div className={styles.currentBidArea}>
                    <div
                      className={styles.title}
                      style={{ color: theme.commentText }}
                    >
                      Current Bid
                    </div>
                    <div
                      className={styles.value}
                      style={{ color: theme.primaryText }}
                    >
                      {price.name}{" "}
                      {auctionData.winAmount
                        ? auctionData.winAmount / 10 ** price.decimals
                        : 0}
                    </div>
                  </div>
                </div>
                <div className={styles.typeArea}>
                  <div
                    className={styles.enabledNFT}
                    style={{
                      color: theme.primaryText,
                      borderColor: theme.buttonBack,
                    }}
                  >
                    Sport NFTs
                  </div>
                </div>
              </div>
              <div className={styles.assetIdArea}>
                <div className={styles.idArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    Price Asset ID
                    {price.description &&
                    price.description !== "" &&
                    price.description !== null ? (
                      <>
                        <CopyToClipboard
                          text={
                            WavesConfig.EXPLORER_URL +
                            "/assets/" +
                            auctionData.price_id
                          }
                        >
                          <span ref={clipboardPrice}></span>
                        </CopyToClipboard>
                        <Popover placement="bottom">
                          <PopoverTrigger>
                            <span
                              className={styles.question}
                              style={{ backgroundColor: theme.buttonBack }}
                              onClick={() => clipboardPrice.current.click()}
                            >
                              ?
                            </span>
                          </PopoverTrigger>
                          <PopoverContent
                            bg="rgba(0, 4, 81, 0.4)"
                            className={styles.content}
                          >
                            {price.description &&
                            price.description !== "" &&
                            price.description !== null ? (
                              <div className={styles.submenu}>
                                <div className={styles.subitem}>
                                  {price.description}
                                </div>
                              </div>
                            ) : null}
                          </PopoverContent>
                        </Popover>
                      </>
                    ) : null}
                  </div>
                  <div
                    className={styles.idInput}
                    style={{ color: theme.primaryText }}
                  >
                    {price.name}
                  </div>
                </div>
                <div className={styles.idArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    NFT Asset ID
                    {description &&
                    description !== "" &&
                    description !== null ? (
                      <>
                        <CopyToClipboard
                          text={
                            WavesConfig.EXPLORER_URL +
                            "/assets/" +
                            auctionData.id
                          }
                        >
                          <span ref={clipboard}></span>
                        </CopyToClipboard>
                        <Popover placement="bottom">
                          <PopoverTrigger>
                            <span
                              className={styles.question}
                              style={{ backgroundColor: theme.buttonBack }}
                              onClick={() => clipboard.current.click()}
                            >
                              ?
                            </span>
                          </PopoverTrigger>
                          <PopoverContent
                            bg="rgba(0, 4, 81, 0.4)"
                            className={styles.content}
                          >
                            {description &&
                            description !== "" &&
                            description !== null ? (
                              <div className={styles.submenu}>
                                <div className={styles.subitem}>
                                  {description}
                                </div>
                              </div>
                            ) : null}
                          </PopoverContent>
                        </Popover>
                      </>
                    ) : null}
                  </div>
                  <div
                    className={styles.idInput}
                    style={{ color: theme.primaryText }}
                  >
                    {nft.name}
                  </div>
                </div>
                <div className={styles.idArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    Current Winner
                  </div>
                  <div
                    className={styles.idInput}
                    style={{ color: theme.primaryText }}
                  >
                    {auctionData.winner ? auctionData.winner : ""}
                  </div>
                </div>
                <div className={styles.idArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    Base Value
                  </div>
                  <div
                    className={styles.value}
                    style={{ color: theme.primaryText }}
                  >
                    {price.name} {auctionData.startValue / 10 ** price.decimals}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonArea}>
              <div className={styles.inputTitle}>{price.name} </div>
              <Input
                variant="unstyled"
                className={styles.inputBox}
                value={bid}
                onChange={(e) => setBid(e.target.value)}
              />
              <span
                className={styles.button}
                style={{ backgroundColor: theme.buttonBack }}
                onClick={Bid}
              >
                Place a bid
              </span>
            </div>
            <div className={styles.comment}>
              <div style={{ color: theme.commentText }}>{commentText}</div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(BidModal);
