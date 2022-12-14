import React, { useRef, useContext, useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import { Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/all";

import Prev from "assets/images/prev.svg";
import Next from "assets/images/next.svg";
import styles from "./Auction.module.scss";
import { ThemeContext } from "context/ThemeContext";

function Auction({ title, auctionType, auction, data, height, customer }) {
  const carousel = useRef(null);
  const { theme } = useContext(ThemeContext);
  const [dataList, setDataList] = useState([]);
  const [visibleMobSearch, setVisibleMobSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    setDataList(data);
  }, [data]);

  const searchAuction = (searchVal) => {
    setSearchVal(searchVal);
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].assetName.toLowerCase().includes(searchVal.toLowerCase()) ||
        data[i].nft_id.toLowerCase().includes(searchVal.toLowerCase()) ||
        data[i].price_id.toLowerCase().includes(searchVal.toLowerCase())
      ) {
        newData.push(data[i]);
      }
    }
    if (searchVal !== "" && searchVal) {
      setDataList(newData);
    } else {
      setDataList(data);
    }
  };

  return (
    <>
      <img
        src={Prev}
        className={styles.leftIcon}
        onClick={() => {
          carousel.current.prev();
        }}
        alt=""
      />
      <div className={styles.container}>
        <div className={styles.titlearea}>
          <div
            className={styles.explorerTitle}
            style={{ color: theme.primaryText }}
          >
            {title}
          </div>
          <div className={styles.searchArea}>
            <div className={styles.searchIcon}>
              <FaSearch />
            </div>
            <Input
              variant="unstyled"
              placeholder="Search"
              className={styles.search}
              _placeholder={{ color: "#000451", paddingLeft: "90px" }}
              onChange={(e) => searchAuction(e.target.value)}
            />
          </div>

          {visibleMobSearch ? (
            <div className={styles.searchAreaMob}>
              <div
                className={styles.searchIcon}
                onClick={() => {
                  setVisibleMobSearch(false);
                }}
              >
                <FaSearch />
              </div>
              <Input
                value={searchVal}
                variant="unstyled"
                placeholder="Search"
                className={styles.search}
                _placeholder={{ color: "#000451", paddingLeft: "30px" }}
                onChange={(e) => searchAuction(e.target.value)}
              />
            </div>
          ) : (
            <div
              className={styles.searchIconMob}
              onClick={() => {
                setVisibleMobSearch(true);
              }}
            >
              <FaSearch />
            </div>
          )}

          {/* <div className = {styles.viewTitle}>View all</div> */}
          {/* <div className = {styles.viewTitle}> </div> */}
        </div>
        <hr className={styles.border}></hr>
        {dataList && dataList.length > 0 ? (
          <Carousel
            ref={carousel}
            category={auction}
            auctionType={auctionType}
            data={dataList}
            height={height}
            customer={customer}
          />
        ) : null}
      </div>
      <img
        src={Next}
        className={styles.rightIcon}
        onClick={() => {
          carousel.current.next();
        }}
        alt=""
      />
    </>
  );
}
export default Auction;
