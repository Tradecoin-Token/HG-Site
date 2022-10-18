import React, { useCallback, useEffect } from "react";
import cx from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import styles from "./Menu.module.scss";
import {
  BsFileEarmarkCheck,
  BsFillCartCheckFill,
  FaHandshake,
  FaToolbox,
  FiArrowDownLeft,
  FiArrowUpRight,
  FaMailBulk,
  MdPayment,
  MdMarkEmailRead,
  IoIosColorPalette,
  AiOutlineLineChart,
  FaHandHoldingUsd,
  BsCurrencyExchange,
  GiPalette,
  IoIosFootball,
  AiOutlineHome,
  BsBagPlus,
  SiFreelancer,
  FaWallet,
} from "react-icons/all";
import { Icon } from "@iconify/react";
import { hashDealzSub, realEstateSub } from "config/misc";

function Menu() {
  const location = useLocation();
  const path = location.pathname.split("/");

  const history = useHistory();
  const gotoPage = useCallback(
    (link) => {
      return history.push(link);
    },
    [history]
  );

  let stakePopup = null;
  useEffect(() => {
    if (location.pathname === "/defi") {
      setTimeout(function () {
        if (stakePopup) stakePopup.click();
      }, 300);
    }
  }, [location, stakePopup]);

  const MenuItem = ({ icon, text, menu, link }) => (
    <div className={styles.subitem} onClick={() => link && gotoPage(link)}>
      {icon ? { ...icon } : <></>}
      <div>{text}</div>
    </div>
  );

  const MyWallet = () => (
    <div
      className={cx(
        styles.menuitem,
        path[1] === "overview" ? styles.activeitem : null
      )}
      onClick={() => gotoPage("/overview")}
    >
      <FaWallet />
      <div>My Wallet</div>
    </div>
  );

  const Payments = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <div
            className={cx(
              styles.menuitem,
              path[1] === "manage" ? styles.activeitem : null
            )}
          >
            <MdPayment />
            <div>Payments</div>
          </div>
        </PopoverTrigger>
        <PopoverContent bg="rgba(0, 4, 81, 0.4)">
          <div className={styles.submenu}>
            <MenuItem
              icon={<FiArrowDownLeft />}
              text="Receive"
              menu="manage"
              link="/manage/receive"
            />
            <MenuItem
              icon={<FiArrowUpRight />}
              text="Send"
              menu="manage"
              link="/manage/send"
            />
            <MenuItem
              icon={<FaMailBulk />}
              text="Mass Send"
              menu="manage"
              link="/manage/mass"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const Tools = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <div
            className={cx(
              styles.menuitem,
              path[1] === "tools" ? styles.activeitem : null
            )}
          >
            <FaToolbox />
            <div>Tools</div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          bg="rgba(0, 4, 81, 0.4)"
          className={styles.certificationContent}
        >
          <div className={styles.submenu}>
            <MenuItem
              icon={<BsFileEarmarkCheck />}
              text="File Certification"
              menu="tools"
              link="/tools/file"
            />
            <MenuItem
              icon={<MdMarkEmailRead />}
              text="Email Certification"
              menu="tools"
              link="/tools/email"
            />
            <MenuItem
              icon={<FaHandshake />}
              text="Mutual Certification"
              menu="tools"
              link="/tools/mutual"
            />
            <MenuItem
              icon={<IoIosColorPalette />}
              text="My NFTs"
              menu="tools"
              link="/tools/user-nfts"
            />
            <MenuItem
              icon={<GiPalette />}
              text="Create NFT"
              menu="tools"
              link="/tools/mint-nft"
            />
            <MenuItem
              icon={<Icon icon="bi:at" color="white" />}
              text="Create Alias"
              menu="tools"
              link="/tools/create-alias"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const Auction = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <div
            className={cx(
              styles.menuitem,
              path[1] === "auction" ? styles.activeitem : null
            )}
          >
            <BsFillCartCheckFill />
            <div>Marketplaces</div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          bg="rgba(0, 4, 81, 0.4)"
          width="400px"
          marginLeft="7%"
          maxHeight="500px"
          overflowY="auto"
        >
          <div className={styles.submenu}>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div className={styles.subitem}>
                  <IoIosColorPalette />
                  <div>Art NFTs</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/artnfts/create" />
                  <MenuItem text="Explore" link="/auction/artnfts/explorer" />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div className={styles.subitem}>
                  <Icon icon="gis:tags-o" />
                  <div>HashDealz</div>
                  <Icon icon="raphael:arrowdown" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                {hashDealzSub.map(({ type, label, icon }, index) => (
                  <Popover key={index}>
                    <PopoverTrigger>
                      <div className={styles.subitem}>
                        <Icon icon={icon} />
                        <div>{`${label}`}</div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      bg="rgba(0, 4, 81, 0.4)"
                      className={styles.auctionContent}
                    >
                      <div className={styles.nftsubmenu}>
                        <MenuItem
                          text="Create"
                          link={`/auction/hashdealz/${type}/create`}
                        />
                        <MenuItem
                          text="Explore"
                          link={`/auction/hashdealz/${type}/explorer`}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div className={styles.subitem}>
                  <IoIosFootball />
                  <div>Sport NFTs</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Explore" link="/auction/sportnfts/explorer" />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div className={styles.subitem}>
                  <Icon icon="el:music" />
                  <div>Music/Events NFTs</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem
                    text="Create"
                    link="/auction/musiceventsnfts/create"
                  />
                  <MenuItem
                    text="Explore"
                    link="/auction/musiceventsnfts/explorer"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div className={styles.subitem}>
                  <AiOutlineHome />
                  <div>Real Estate NFTs</div>
                  <Icon icon="raphael:arrowdown" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                {realEstateSub.map(({ type, label, icon }, index) => (
                  <Popover key={index}>
                    <PopoverTrigger>
                      <div className={styles.subitem}>
                        <Icon icon={icon} />
                        <div>{`${label}`}</div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      bg="rgba(0, 4, 81, 0.4)"
                      className={styles.auctionContent}
                    >
                      <div className={styles.nftsubmenu}>
                        <MenuItem
                          text="Create"
                          link={`/auction/realestatenfts/${type}/create`}
                        />
                        <MenuItem
                          text="Explore"
                          link={`/auction/realestatenfts/${type}/explorer`}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <BsBagPlus />
                  <div>Services NFTs</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/servicesnfts/create" />
                  <MenuItem
                    text="Explore"
                    link="/auction/servicesnfts/explorer"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <Icon icon="ic:baseline-health-and-safety" color="white" />
                  <div>Health/Wellness NFT</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/health/create" />
                  <MenuItem text="Explore" link="/auction/health/explorer" />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <Icon icon="fa-solid:box-open" color="white" />
                  <div>Products NFT</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/products/create" />
                  <MenuItem text="Explore" link="/auction/products/explorer" />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <Icon icon="ic:baseline-collections" color="white" />
                  <div>Collectibles NFT</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/collectibles/create" />
                  <MenuItem
                    text="Explore"
                    link="/auction/collectibles/explorer"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <Icon icon="healthicons:electricity" color="white" />
                  <div>HashPawa Electricity</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/electricity/create" />
                  <MenuItem
                    text="Explore"
                    link="/auction/electricity/explorer"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <Icon icon="ooui:network" color="white" />
                  <div>HashPawa Airtime/Data</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/airtime/create" />
                  <MenuItem text="Explore" link="/auction/airtime/explorer" />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <Icon icon="ion:fast-food-outline" color="white" />
                  <div>Food/Beverage NFT</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/food/create" />
                  <MenuItem text="Explore" link="/auction/food/explorer" />
                </div>
              </PopoverContent>
            </Popover>
            <Popover
              returnFocusOnClose={false}
              // placement="right"
              closeOnBlur={true}
              trigger="click"
            >
              <PopoverTrigger>
                <div
                  className={styles.subitem}
                  style={{ borderBottom: "none" }}
                >
                  <Icon icon="ion:rocket-outline" color="white" />
                  <div>Nest NFT(Startups)</div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                bg="rgba(0, 4, 81, 0.4)"
                className={styles.auctionContent}
              >
                <div className={styles.nftsubmenu}>
                  <MenuItem text="Create" link="/auction/nest/create" />
                  <MenuItem text="Explore" link="/auction/nest/explorer" />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const DeFi = () => {
    return (
      <>
        <div
          className={cx(
            styles.menuitem,
            path[1] === "defi" ? styles.activeitem : null
          )}
          onClick={() => {
            gotoPage("/defi");
          }}
        >
          <AiOutlineLineChart />
          <div>DeFi</div>
        </div>
        <Popover>
          <PopoverTrigger>
            <div
              ref={(pop) => {
                stakePopup = pop;
              }}
            ></div>
          </PopoverTrigger>
          <PopoverContent bg="rgba(0, 4, 81, 0.4)">
            <div className={styles.submenu}>
              <MenuItem
                icon={<Icon icon="ps:bank-safe" />}
                text="Stake"
                menu="defi"
                link="/defi/stake"
              />
              <MenuItem
                icon={<FaHandHoldingUsd />}
                text="Loans"
                menu="defi"
                link="/defi/loan"
              />
              <MenuItem
                icon={<Icon icon="mdi:bank" />}
                text="Escrow"
                menu="defi"
                link="/defi/escrow"
              />
              <MenuItem
                icon={<SiFreelancer />}
                text="Freelance"
                menu="defi"
                link="/defi/hashgig"
              />
              <div className={styles.subitem}>
                <BsCurrencyExchange />
                <div>Forex</div>
                <div className={styles.subcomment}>Coming soon</div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  };

  return (
    <div className={styles.menu}>
      <MyWallet />
      <Payments />
      <Tools />
      <Auction />
      <DeFi />
    </div>
  );
}

export default Menu;
