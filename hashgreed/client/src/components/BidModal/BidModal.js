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
  color,
} from "@chakra-ui/react";
import styles from "./BidModal.module.scss";
import { ThemeContext } from "context/ThemeContext";
import { AiOutlineClose, IoIosCloseCircle } from "react-icons/all";
import WavesUtils from "utils/waves";
import AlertUtils from "utils/alert";
import WavesConfig from "config/waves";
import cx from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import Prev from "assets/images/left.png";
import Next from "assets/images/right.png";
import { useHashDealz } from "hooks/useHashDealz";
import { useRealEstate } from "hooks/useRealEstate";
import { getDecimal, getName } from "utils/utils";

const BidModal = (
  { auctionData, auctionType, category, height, customer },
  ref
) => {
  auctionData = auctionData ? auctionData : {};
  if (!auctionData) {
    auctionData.assetComment = "";
    auctionData.assetName = "";
    auctionData.assetType = "";
    auctionData.end_block = 0;
    auctionData.nft_amount = 0;
    auctionData.nft_id = "";
    auctionData.organizer = "";
    auctionData.price = 0;
    auctionData.price_id = "";
    auctionData.avatar = "";
    auctionData.id = "";
    auctionData.winner = "";
    auctionData.avatar = "";
    auctionData.avatars = [];
  }
  if (!auctionData.bid) {
    auctionData.bid = 0;
  }
  const { theme } = useContext(ThemeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bid, setBid] = useState("");
  const clipboard = useRef(null);
  const clipboardPrice = useRef(null);
  const carousel = useRef(null);
  const [creator, setCreator] = useState("");

  const { label: hashLabel } = useHashDealz();
  const { label: realLabel } = useRealEstate(); 

  let duration = auctionData.end_block - height;
  if (duration < 0) {
    duration = 0;
  }

  const mins = duration % 60;
  const hours = ((duration - mins) / 60) % 24;
  const days = (duration - mins - hours * 60) / 1440;

  let auctionTypeText = "";
  let commentType = "";
  if (auctionType === "ArtNFTs") {
    auctionTypeText = "Art NFTs";
    commentType = "Art NFT";
  } else if (auctionType === "HashDealz") {
    auctionTypeText = `HashDealz - ${hashLabel}`;
    commentType = `HashDealz - ${hashLabel}`;
  } else if (auctionType === "SportNFTs") {
    auctionTypeText = "Sport NFTs";
    commentType = "Sport NFT";
  } else if (auctionType === "MusicEventsNFTs") {
    auctionTypeText = "Music/Events NFTs";
    commentType = "Music/Events NFT";
  } else if (auctionType === "RealEstateNFTs") {
    auctionTypeText = `RealEstate - ${realLabel}`;
    commentType = `RealEstate - ${realLabel}`;
  } else if (auctionType === "ServicesNFTs") {
    auctionTypeText = "Services NFTs";
    commentType = "Services NFT";
  } else if (auctionType === "Health/Wellness NFT") {
    auctionTypeText = "Health/Wellness NFTs";
    commentType = "Health/Wellness NFT";
  } else if (auctionType === "Products NFT") {
    auctionTypeText = "Products NFTs";
    commentType = "Products NFT";
  } else if (auctionType === "Collectibles NFT") {
    auctionTypeText = "Collectibles NFTs";
    commentType = "Collectibles NFT";
  } else if (auctionType === "HashPawa Electricity") {
    auctionTypeText = "HashPawa Electricity NFTs";
    commentType = "HashPawa Electricity NFT";
  } else if (auctionType === "HashPawa Airtime/Data") {
    auctionTypeText = "HashPawa Airtime/Data";
    commentType = "HashPawa Airtime/Data";
  } else if (auctionType === "Food/Beverage NFT") {
    auctionTypeText = "Food/Beverage NFT";
    commentType = "Food/Beverage NFT";
  } else if (auctionType === "Nest NFT (Startups)") {
    auctionTypeText = "Nest NFT (Startups)";
    commentType = "Nest NFT (Startups)";
  }
  const commentText =
    "Hashgreed charges 5% fee on all " +
    commentType +
    (auctionType === "HashDealz" ? " Purchases" : " Auctions");

  const [nft, setNFT] = useState({
    name: "",
    decimals: 0,
    description: "",
    issuer: "",
  });

  

  useEffect(() => {
    setPrice({
      decimals:  getDecimal(auctionData.price_id),
      name: getName(auctionData.price_id)
    })
  }, [auctionData.price_id, ])
  


  const [price, setPrice] = useState({
    name: "",
    decimals: 0,
    description: "",
  });

  const Withdraw = () => {
    WavesUtils.WithdrawAuction(auctionData.id);
    AlertUtils.SystemAlert("NFT successfully withdraw");
  };

  
  const Expedite = () => {
    WavesUtils.ExpediteAuction(auctionData.id);
    AlertUtils.SystemAlert("NFT successfully Expedited");
  };


  const Bid = async () => {
    if (isNaN(bid) || bid <= 0) {
      AlertUtils.SystemAlert("Bid amount is not valid");
      return;
    }
    AlertUtils.SystemAlert(
      "Buying and Selling NFT are subject to risk so better you will do your own research before buying. Be aware of scam assets as we are only a platform to provide services"
    );
    await WavesUtils.BidAuction(auctionData.id, bid, auctionData.price_id);
    AlertUtils.SystemAlert(
      "You have successfully placed a bid. When someone else places a higher bid, your bid will be returned back to you"
    );
    setBid(0);
  };

  useEffect(() => {
    if (auctionData.nft_id && auctionData.nft_id !== "") {
      WavesUtils.getAssetInfo(auctionData.nft_id, setNFT);
      WavesUtils.getNftCreator(auctionData.nft_id, setCreator);
    }
    if (auctionData.price_id && auctionData.price_id !== "")
      WavesUtils.getAssetInfo(auctionData.price_id, setPrice);
  }, [auctionData.nft_id, auctionData.price_id, setNFT, setPrice]);

  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
    closeModal() {
      onClose();
    },
  }));
  const Alice = () => {
    return (
      <AliceCarousel
        ref={carousel}
        disableDotsControls={true}
        disableButtonsControls={true}
        playButtonEnabled={false}
        autoPlayActionDisabled={true}
      >
        {auctionData.avatars &&
          auctionData.avatars.map((item, index) => {
            return (
              <div
                className={styles.picCell}
                key={index}
                style={{ backgroundColor: theme.stepBackground }}
              >
                <img
                  src={`https://ipfs.io/ipfs/${item}`}
                  className={styles.img}
                  alt=""
                />
              </div>
            );
          })}
      </AliceCarousel>
    );
  };

  console.log("MMMMMMMMM", nft.decimals)
  return (
    <Modal onClose={onClose} size={"5xl"} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        style={{
          borderRadius: "16px",
          boxShadow: " 0px 20px 20px rgba(0, 0, 0, 0.15)",
          backgroundColor: theme.bidModalBackground,
          marginBottom: "20px",
        }}
        className={styles.modalContent}
      >
        <div
          className={styles.modalArea}
          style={{ backgroundColor: theme.bidModalBackground }}
        >
          {auctionType === "HashDealz" || auctionType === "ArtNFTs" ? (
            <div className={styles.imageArea}>
              <div className={styles.carouselArea}>
                <div className={styles.piccarousel}>
                  <Alice />
                  <div className={styles.arrow}>
                    <img
                      src={Prev}
                      className={styles.leftIcon}
                      style={{ color: theme.primaryText }}
                      onClick={() => {
                        carousel.current.slidePrev();
                      }}
                      alt=""
                    />
                    <img
                      src={Next}
                      className={styles.rightIcon}
                      onClick={() => {
                        carousel.current.slideNext();
                      }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.imageArea}>
              <img
                src={`https://ipfs.io/ipfs/${auctionData.avatar}`}
                className={styles.image}
                alt=""
              />
            </div>
          )}
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
            {category === "live" && customer === auctionData.winner ? (
              <div className={styles.live}>
                <span
                  className={cx(styles.button, styles.filled, styles.button)}
                  style={{
                    backgroundColor: theme.runningButtonBack,
                    marginRight: "20px",
                  }}
                >
                  Running
                </span>
                <span
                  className={cx(styles.button, styles.disabled, styles.button)}
                  style={{ backgroundColor: theme.disabledButtonBack }}
                >
                  Withdraw
                </span>
              </div>
            ) : category === "expired" &&
              (customer === auctionData.winner ||
                ((auctionData.winner === "" || !auctionData.winner) &&
                  customer === auctionData.organizer)) ? (
              <div className={styles.expired}>
                <span
                  className={cx(styles.button, styles.disabled, styles.button)}
                  style={{
                    backgroundColor: theme.disabledButtonBack,
                    marginRight: "20px",
                  }}
                >
                  Expired Auction
                </span>
                <span
                  className={cx(styles.button, styles.filled, styles.button)}
                  style={{ backgroundColor: theme.buttonBack }}
                  onClick={Withdraw}
                >
                  Withdraw
                </span>
              </div>
            ) : category === "expired" &&
              (customer !== auctionData.winner ||
                customer !== auctionData.organizer) ? (
              <div className={styles.expired}>
                <span
                  className={cx(styles.button, styles.disabled, styles.button)}
                  style={{
                    backgroundColor: theme.disabledButtonBack,
                    marginRight: "20px",
                  }}
                >
                  Expired Auction
                </span>
                <span
                  className={cx(styles.button, styles.filled, styles.button)}
                  style={{ backgroundColor: theme.disabledButtonBack }}
                >
                  Withdraw
                </span>
              </div>
            ) : category === "soldout" && customer === auctionData.operator ? (
              <div
                className={styles.expired}
                style={{ justifyContent: "flex-end" }}
              >
                <span
                  className={cx(styles.button, styles.filled, styles.button)}
                  style={{ backgroundColor: theme.disabledButtonBack }}
                >
                  Withdrawn
                </span>
              </div>
            ) : category === "soldout" && customer !== auctionData.operator ? (
              <div className={styles.soldout}>
                <span
                  className={cx(styles.button, styles.disabled, styles.button)}
                  style={{ backgroundColor: theme.disabledButtonBack }}
                >
                  Soldout or Withdrawn
                </span>
              </div>
            ) : null}
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
                    {auctionData.assetName}
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
                    {auctionData.assetComment}
                  </div>
                </div>
                <div className={styles.priceArea}>
                  <div className={styles.minPriceArea}>
                    <div
                      className={styles.title}
                      style={{ color: theme.commentText }}
                    >
                      {auctionType !== "HashDealz"
                        ? "Starting/Min price"
                        : "Price Per Unit"}
                    </div>
                    <div
                      className={styles.value}
                      style={{ color: theme.primaryText }}
                    >
                      {price.name}<br/> {auctionData.price / 10 ** price.decimals}
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
                      {price.name} <br/> {auctionData.bid / 10 ** price.decimals}
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
                    {auctionTypeText}
                  </div>
                </div>
              </div>
              <div className={styles.assetIdArea}>
                <div className={styles.idArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    {`${
                      auctionType === "HashDealz"
                        ? "Maximum Stock Quantity"
                        : "Quantity of Product"
                    }`}
                  </div>
                  <div
                    className={styles.idInput}
                    style={{ color: theme.primaryText }}
                  >
                    {auctionData.nft_amount }
                  </div>
                </div>
                <div className={styles.idArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    Currency ID
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
                    {auctionData.price_id}
                  </div>
                </div>
                {auctionType === "SportNFTs" ? (
                  <div className={styles.idArea}>
                    <div
                      className={styles.title}
                      style={{ color: theme.commentText }}
                    >
                      NFT Asset ID
                      {nft.description &&
                      nft.description !== "" &&
                      nft.description !== null ? (
                        <>
                          <CopyToClipboard
                            text={
                              WavesConfig.EXPLORER_URL +
                              "/assets/" +
                              auctionData.nft_id
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
                              {nft.description &&
                              nft.description !== "" &&
                              nft.description !== null ? (
                                <div className={styles.submenu}>
                                  <div className={styles.subitem}>
                                    {nft.description}
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
                      {auctionData.nft_id}
                    </div>
                  </div>
                ) : (
                  <div className={styles.idArea}>
                    <div
                      className={styles.title}
                      style={{ color: theme.commentText }}
                    >
                      Seller Address
                    </div>
                    <div
                      className={styles.idInput}
                      style={{ color: theme.primaryText }}
                    >
                      {auctionData.organizer}
                    </div>
                  </div>
                )}
                {auctionType !== "SportNFTs" && auctionType !== "HashDealz" ? (
                  <div className={styles.idArea}>
                    <div
                      className={styles.title}
                      style={{ color: theme.commentText }}
                    >
                      Creator Address
                    </div>
                    <div
                      className={styles.idInput}
                      style={{ color: theme.primaryText }}
                    >
                      {creator}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
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
                  <div className={styles.comment}>
                    <b>
                    Contact Seller after bidding so seller can reduce time left to just 1 min or less.
                    </b>
                  </div>
                </div>
                <div className={styles.idArea}>
                  <div
                    className={styles.title}
                    style={{ color: theme.commentText }}
                  >
                    Time Left
                  </div>
                  <div
                    className={styles.value}
                    style={{ color: theme.primaryText }}
                  >
                    {`${days} days ${hours} hours ${mins} mins`}
                  </div>
                  
                </div>
                <button
                  className={cx(styles.button,  styles.button)}
                  style={{ backgroundColor: theme.disabledButtonBack, borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', color: 'white', padding: '7px' }}
                  onClick={Expedite}
                >
                     Expedite
                    </button>
              </div>
            </div>
            {category === "live" ? (
              <>
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
              </>
            ) : category === "expired" && customer === auctionData.winner ? (
              <>
                <div
                  className={styles.buttonArea}
                  style={{ backgroundColor: "#C8C6C7" }}
                >
                  <div className={styles.inputTitle}>{price.name} </div>
                  <Input
                    variant="unstyled"
                    className={styles.inputBox}
                    disabled
                  />
                  <span
                    className={styles.button}
                    style={{ backgroundColor: theme.disabledButtonBack }}
                  >
                    Place a bid
                  </span>
                </div>
                <div className={styles.comment}>
                  <div style={{ color: theme.commentText }}>{commentText}</div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(BidModal);
