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

import PaymentTokenSelector from "components/CurrencySelector/PaymentTokenSelector";
import DurationPicker from "components/DurationPicker";
import { useRealEstate } from "hooks/useRealEstate";

function Create({ walletState }) {
  const transactionFee = 0.005;
  const { theme } = useContext(ThemeContext);
  const [duration, setDuration] = useState(60 * 24); // 1 day
  const [price, setPrice] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetComment, setAssetComment] = useState("");
  const [priceID, setPriceID] = useState("");
  const [nftID, setNFTID] = useState();
  const [nftAmount, setNFTAmount] = useState("1");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 5 * 1024 * 1024,
  });
  const [, setUploading] = useState(false);
  const clipboard = useRef(null);
  const clipboardPrice = useRef(null);
  const { type, label } = useRealEstate();
  const assetType = `RealEstateNFTs/${type}`;

  const [nft, setNFT] = useState({
    name: "",
    decimals: 0,
    description: "",
  });
  const [priceData, setPriceData] = useState({
    name: "",
    decimals: 0,
    description: "",
  });
  useEffect(() => {
    if (walletState.address) {
      const proc = () => {
        if (nftID && nftID !== "") WavesUtils.getAssetInfo(nftID, setNFT);
        if (priceID && priceID !== "")
          WavesUtils.getAssetInfo(priceID, setPriceData);
      };
      proc();
    }
  }, [walletState.address, nftID, priceID]);

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
      if (acceptedFiles.length !== 1) {
        AlertUtils.SystemAlert("You must upload 1 image for NFT");
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
      const uploadRet = await ApiUtils.auctionUpload(
        acceptedFiles[0],
        tx.id,
        assetType,
        assetName,
        assetComment
      );
      return uploadRet;
    };
    const bSuccess = await createAuction();
    setDuration("");
    setPrice("");
    setPriceID("");
    setNFTID("");
    setNFTAmount("");
    setAssetName("");
    setAssetComment("");
    acceptedFiles.splice(0, acceptedFiles.length);
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
            {`RealEstate    -    ${label}`}
          </div>
        </div>
        <div className={styles.certifyTitle}>Create an Auction</div>
        <hr className={styles.border} />
        <div {...getRootProps()} className={styles.dropzone}>
          <BsPlusCircle size={40} style={{ color: theme.dropZone }} />
          <input {...getInputProps()} />
          <p className={styles.upload} style={{ color: theme.dropZone }}>
            {acceptedFiles.length === 1
              ? acceptedFiles[0].path
              : "Click to select or drag and drop a file here"}
          </p>
          <p
            className={styles.uploadComment}
            style={{ color: theme.commentText }}
          >
            Max files size: 5MB
          </p>
        </div>
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
                {nft.description &&
                nft.description !== "" &&
                nft.description !== null ? (
                  <>
                    <CopyToClipboard
                      text={WavesConfig.EXPLORER_URL + "/assets/" + nftID}
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
              <Input
                className={styles.inputValue}
                style={{ color: theme.primaryText }}
                value={nftID}
                onChange={(e) => setNFTIDs(e.target.value)}
                variant="flushed"
                placeholder=""
              />
            </div>
          </div>
          <div className={styles.auctionDatas}>
            <div className={styles.inputarea}>
              <div
                className={styles.inputTitle}
                style={{ color: theme.commentText }}
              >
                Starting price
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
                Quantity of Product
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
                maxDays={360}
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
