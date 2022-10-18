import React, { useContext, useEffect, useState, useRef } from "react";

import { useDropzone } from "react-dropzone";
import { Input, Textarea } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/all";

import cx from "classnames";
import styles from "./Create.module.scss";
import ApiUtils from "utils/api";
import WavesUtils from "utils/waves";
import AlertUtils from "utils/alert";
import WavesConfig from "config/waves";
import walletContainer from "redux/containers/wallet";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { ThemeContext } from "context/ThemeContext";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import Prev from "assets/images/left.png";
import Next from "assets/images/right.png";
import PaymentTokenSelector from "components/CurrencySelector/PaymentTokenSelector";
import DurationPicker from "components/DurationPicker";
import { useHashDealz } from "hooks/useHashDealz";

function Create({ walletState }) {
  const transactionFee = 0.005;
  const { theme } = useContext(ThemeContext);
  const [duration, setDuration] = useState(60 * 24); // 1 day
  const [price, setPrice] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetComment, setAssetComment] = useState("");
  const [priceID, setPriceID] = useState("");
  const [nftID, setNFTID] = useState(WavesConfig.RKMT_ID);
  const [nftAmount, setNFTAmount] = useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 5 * 1024 * 1024,
  });
  const [, setUploading] = useState(false);
  const clipboardPrice = useRef(null);
  const [imgsrc, setImgsrc] = useState([]);
  const carousel = useRef(null);

  const [, setNFT] = useState({
    name: "",
    decimals: 0,
    description: "",
  });
  const [priceData, setPriceData] = useState({
    name: "",
    decimals: 0,
    description: "",
  });

  const { type, label } = useHashDealz();
  const assetType = `HashDealz/${type}`;

  useEffect(() => {
    if (walletState.address) {
      const proc = () => {
        if (nftID && nftID !== "") WavesUtils.getAssetInfo(nftID, setNFT);
        if (priceID && priceID !== "")
          WavesUtils.getAssetInfo(priceID, setPriceData);
      };
      proc();
    }
    setImgsrc([]);
    acceptedFiles &&
      acceptedFiles.map((cert) => {
        let reader = new FileReader();
        reader.readAsDataURL(cert);
        reader.onloadend = function () {
          setImgsrc((imgsrc) => imgsrc.concat(URL.createObjectURL(cert)));
        };
        return reader;
      });
  }, [walletState.address, nftID, priceID, acceptedFiles, setImgsrc]);

  const setNFTIDs = (id) => {
    setNFTID(id);
  };

  const startAuction = async () => {
    const createAuction = async () => {
      if (isNaN(price) || price <= 0) {
        AlertUtils.SystemAlert("Starting Price is not valid");
        return false;
      }
      if (isNaN(nftAmount) || nftAmount <= 0) {
        AlertUtils.SystemAlert("Quantity of Product is not valid");
        return false;
      }
      if (duration <= 0) {
        AlertUtils.SystemAlert("Duration is not valid");
        return false;
      }
      if (acceptedFiles.length < 1) {
        AlertUtils.SystemAlert(
          "You must upload at least 1 image for HashDealz"
        );
        return false;
      }
      if (acceptedFiles.length > 12) {
        AlertUtils.SystemAlert("You can upload up to 12 images for HashDealz");
        return false;
      }
      const tx = await WavesUtils.StartAuction(
        duration,
        parseFloat(price),
        priceID,
        nftID,
        parseFloat(nftAmount)
      );
      if (!tx) return false;
      setUploading(true);
      for (let idx = 0; idx < acceptedFiles.length; ++idx) {
        const file = acceptedFiles[idx];
        const uploadRet = await ApiUtils.auctionUpload(
          file,
          tx.id,
          assetType,
          assetName,
          assetComment
        );
        if (!uploadRet) return false;
      }
      return true;
    };
    const bSuccess = await createAuction();
    setDuration("");
    setPrice("");
    setPriceID("");
    setNFTAmount("");
    setAssetName("");
    setAssetComment("");
    acceptedFiles.splice(0, acceptedFiles.length);
    setImgsrc([]);
    acceptedFiles.length = 0;
    setUploading(false);
    bSuccess && AlertUtils.SystemAlert("Auction was successfully started");
  };

  return (
    <div className={styles.create}>
      <div className={styles.container}>
        <div className={styles.nftType}>
          <div
            className={styles.enabledNFT}
            style={{ color: theme.primaryText, borderColor: theme.buttonBack }}
          >
            {`HashDealz    -    ${label}`}
          </div>
        </div>
        <div className={styles.certifyTitle}>Create an Auction</div>
        <hr className={styles.border} />
        <div {...getRootProps()} className={styles.dropzone}>
          <BsPlusCircle size={40} style={{ color: theme.dropZone }} />
          <input {...getInputProps()} multiple />
          <p className={styles.upload} style={{ color: theme.dropZone }}>
            {acceptedFiles.length >= 1
              ? acceptedFiles.length === 1
                ? acceptedFiles.length + " image is selected."
                : acceptedFiles.length + " images are selected."
              : "Click to select or drag and drop a file here"}
          </p>
          <p
            className={styles.uploadComment}
            style={{ color: theme.commentText }}
          >
            Max files size: 5MB
          </p>
        </div>
        {imgsrc && imgsrc.length > 0 ? (
          <div className={styles.carouselArea}>
            <div className={styles.piccarousel}>
              <img
                src={Prev}
                className={styles.leftIcon}
                style={{ color: theme.primaryText }}
                onClick={() => {
                  carousel.current.slidePrev();
                }}
                alt=""
              />
              <AliceCarousel
                ref={carousel}
                disableDotsControls={true}
                disableButtonsControls={true}
                playButtonEnabled={false}
                autoPlayActionDisabled={true}
              >
                {imgsrc &&
                  imgsrc.map((result, index) => {
                    return (
                      <div
                        className={styles.picCell}
                        key={index}
                        style={{ backgroundColor: theme.stepBackground }}
                      >
                        <img src={result} className={styles.img} alt="" />
                      </div>
                    );
                  })}
              </AliceCarousel>
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
        ) : null}
        <div className={styles.datasarea}>
          <div className={styles.assetData}>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                Name of Asset
              </div>
              <Input
                className={styles.inputValue}
                style={{ color: theme.primaryText }}
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                variant="flushed"
                placeholder=""
              />
            </div>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                About this asset
              </div>
              <Textarea
                className={styles.messagezone}
                style={{ color: theme.primaryText }}
                size={5}
                maxLength={220}
                value={assetComment}
                onChange={(e) => setAssetComment(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.assetIds}>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                Currency
                {priceData.description &&
                priceData.description !== "" &&
                priceData.description !== null ? (
                  <>
                    <CopyToClipboard
                      text={WavesConfig.EXPLORER_URL + "/assets/" + priceID}
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
                        {priceData.description &&
                        priceData.description !== "" &&
                        priceData.description !== null ? (
                          <div className={styles.submenu}>
                            <div className={styles.subitem}>
                              {priceData.description}
                            </div>
                          </div>
                        ) : null}
                      </PopoverContent>
                    </Popover>
                  </>
                ) : null}
              </div>
              <PaymentTokenSelector creatable handleChange={setPriceID} />
            </div>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                NFT asset ID
                {/* {
                                    nft.description && nft.description !== '' && nft.description !== null ?
                                    <>
                                    <CopyToClipboard text={WavesConfig.EXPLORER_URL + '/assets/' + nftID}>
                                    <span ref={clipboard}></span>
                                    </CopyToClipboard>
                                    <Popover  placement='bottom'>
                                    <PopoverTrigger>
                                        <span className={styles.question} style={{backgroundColor: theme.buttonBack}} onClick={() => clipboard.current.click()}>
                                        ?
                                        </span>
                                    </PopoverTrigger>
                                    <PopoverContent bg='rgba(0, 4, 81, 0.4)' className = {styles.content}>
                                        {
                                        nft.description && nft.description !== '' && nft.description !== null ?
                                        <div className={styles.submenu}>
                                            <div className={styles.subitem} >{nft.description}</div>
                                        </div>
                                        :
                                        null
                                        }
                                    </PopoverContent>
                                    </Popover>
                                    </>
                                    :
                                    null
                                } */}
              </div>
              <Input
                className={styles.inputValue}
                style={{ color: theme.primaryText }}
                value={WavesConfig.RKMT_ID}
                onChange={(e) => setNFTIDs(e.target.value)}
                variant="flushed"
                placeholder=""
                disabled
              />
            </div>
          </div>
          <div className={styles.auctionDatas}>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                Price Per Unit
              </div>
              <Input
                className={styles.inputValue}
                style={{ color: theme.primaryText }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="flushed"
                placeholder=""
              />
            </div>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                Maximum Stock Quantity
              </div>
              <Input
                className={styles.inputValue}
                style={{ color: theme.primaryText }}
                value={nftAmount}
                onChange={(e) => setNFTAmount(e.target.value)}
                variant="flushed"
                placeholder=""
              />
            </div>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                Duration in minutes
              </div>
              <DurationPicker
                initialDuration={{ days: 1, hours: 0, minutes: 0 }}
                maxDays={365}
                onChange={({ days, hours, minutes }) => {
                  setDuration(days * 1440 + hours * 60 + minutes);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.feearea}>
          <div className={styles.transaction}>
            <div className={styles.feeTitle} style={{ color: theme.feeText }}>
              Transaction fee:
            </div>
            <div className={styles.fee} style={{ color: theme.feeText }}>
              {transactionFee} Waves
            </div>
          </div>
        </div>
        <div className={styles.confirmarea}>
          <span
            className={cx(styles.button, styles.filled)}
            onClick={startAuction}
            style={{ backgroundColor: theme.buttonBack }}
          >
            Create
          </span>
          <div
            className={styles.subcomment}
            style={{ color: theme.commentText }}
          >
            This transaction is secure and will open Waves Signer
          </div>
        </div>
      </div>
    </div>
  );
}

export default walletContainer(Create);
