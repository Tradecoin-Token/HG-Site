import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import HASH from "assets/icons/HASH.svg";
import RKMT from "assets/icons/RKMT.svg";
import USDT from "assets/icons/USDT.svg";
import WAVES from "assets/icons/WAVES.svg";
import styles from "./Drawer.module.scss";
import { ThemeContext } from "context/ThemeContext";
import ColorModeSwitcher from "components/ColorModeSwitcher/ColorModeSwitcher";

import walletContainer from "redux/containers/wallet";
import {
  MdMarkEmailRead,
  MdPayment,
  IoIosFootball,
  SiFreelancer,
  HiOutlineLightBulb,
} from "react-icons/all";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import {
  FaCertificate,
  FaHandHoldingUsd,
  FaHandshake,
  FaHome,
  FaMailBulk,
  FaToolbox,
  FaWallet,
} from "react-icons/fa";
import {
  BsBagPlus,
  BsCurrencyExchange,
  BsFileEarmarkCheck,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import {
  AiOutlineHome,
  AiOutlineLineChart,
  AiOutlineQuestion,
} from "react-icons/ai";
import { GiPalette } from "react-icons/gi";
import { hashDealzSub, realEstateSub } from "config/misc";

function HashgreedDrawer({ isOpen, onClose, walletState }) {
  const location = useLocation();
  const path = location.pathname.split("/");
  const ref = useRef(null);

  const [, setActiveMenu] = useState("");

  const history = useHistory();
  const gotoPage = useCallback((link) => history.push(link), [history]);

  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isOpen) {
      // onOpen
      setActiveMenu(path[1]);
    }
  }, [isOpen, path]);

  const MenuItem = ({ text, link, icon }) => (
    <div
      className={styles.subitem}
      onClick={() => {
        onClose();
        gotoPage(link);
      }}
    >
      {icon ? { ...icon } : <></>}
      <div>{text}</div>
    </div>
  );

  const AuthRoutes = () => {
    return (
      <>
        <div
          className={styles.link}
          onClick={() => {
            onClose();
            gotoPage("/overview");
          }}
        >
          <FaWallet />
          <div>My Wallet</div>
        </div>
        <hr className={styles.hr} />
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>
              <MdPayment />
              <div>Payments</div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            bg="rgba(0, 4, 81, 0.4)"
            maxWidth="90%"
            marginLeft="7%"
          >
            <div className={styles.submenu}>
              <MenuItem
                text="Receive"
                icon={<FiArrowDownLeft />}
                link="/manage/receive"
              />
              <MenuItem
                text="Send"
                icon={<FiArrowUpRight />}
                link="/manage/send"
              />
              <MenuItem
                text="Mass Send"
                icon={<FaMailBulk />}
                link="/manage/mass"
              />
            </div>
          </PopoverContent>
        </Popover>
        <hr className={styles.hr} />
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>
              <FaToolbox />
              <div>Tools</div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            bg="rgba(0, 4, 81, 0.4)"
            maxWidth="90%"
            marginLeft="7%"
          >
            <div className={styles.submenu}>
              <MenuItem
                text="File Certification"
                icon={<BsFileEarmarkCheck />}
                link="/tools/file"
              />
              <MenuItem
                text="Email Certification"
                icon={<MdMarkEmailRead />}
                link="/tools/email"
              />
              <MenuItem
                text="Mutual Certification"
                icon={<FaHandshake />}
                link="/tools/mutual"
              />
              <MenuItem
                text="My NFTs"
                icon={<IoIosColorPalette />}
                link="/tools/user-nfts"
              />
              <MenuItem
                text="Create NFT"
                icon={<GiPalette />}
                link="/tools/mint-nft"
              />
              <MenuItem
                text="Create Alias"
                link="/tools/create-alias"
                icon={<Icon icon="bi:at" color="white" />}
              />
            </div>
          </PopoverContent>
        </Popover>
        <hr className={styles.hr} />
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>
              <BsFillCartCheckFill />
              <div>Marketplaces</div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            bg="rgba(0, 4, 81, 0.4)"
            maxWidth="90%"
            marginLeft="7%"
            maxHeight="300px"
            overflowY="auto"
          >
            <div className={styles.submenu}>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <IoIosColorPalette />
                    <div>Art NFTs</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem text="Create" link="/auction/artnfts/create" />
                    <MenuItem text="Explore" link="/auction/artnfts/explorer" />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
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
                  maxHeight="300px"
                  overflowY="auto"
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
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <IoIosFootball />
                    <div>Sport NFTs</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem
                      text="Explore"
                      link="/auction/sportnfts/explorer"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="el:music" />
                    <div>Music/Events NFTs</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
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
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <AiOutlineHome />
                    <div>Real Estate NFTs</div>
                    <Icon icon="raphael:arrowdown" />
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
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
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <BsBagPlus />
                    <div>Services NFTs</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem
                      text="Create"
                      link="/auction/servicesnfts/create"
                    />
                    <MenuItem
                      text="Explore"
                      link="/auction/servicesnfts/explorer"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="ic:baseline-health-and-safety" color="white" />
                    <div>Health/Wellness NFT</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem text="Create" link="/auction/health/create" />
                    <MenuItem text="Explore" link="/auction/health/explorer" />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="fa-solid:box-open" color="white" />
                    <div>Products NFT</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem text="Create" link="/auction/products/create" />
                    <MenuItem
                      text="Explore"
                      link="/auction/products/explorer"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="ic:baseline-collections" color="white" />
                    <div>Collectibles NFT</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem
                      text="Create"
                      link="/auction/collectibles/create"
                    />
                    <MenuItem
                      text="Explore"
                      link="/auction/collectibles/explorer"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="healthicons:electricity" color="white" />
                    <div>HashPawa Electricity</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem
                      text="Create"
                      link="/auction/electricity/create"
                    />
                    <MenuItem
                      text="Explore"
                      link="/auction/electricity/explorer"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="ooui:network" color="white" />
                    <div>HashPawa Airtime/Data</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem text="Create" link="/auction/airtime/create" />
                    <MenuItem text="Explore" link="/auction/airtime/explorer" />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="ion:fast-food-outline" color="white" />
                    <div>Food/Beverage NFT</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem text="Create" link="/auction/food/create" />
                    <MenuItem text="Explore" link="/auction/food/explorer" />
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <div className={styles.subitem}>
                    <Icon icon="ion:rocket-outline" color="white" />
                    <div>Nest NFT(Startups)</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent bg="rgba(0, 4, 81, 0.4)" maxWidth="70%">
                  <div className={styles.submenu}>
                    <MenuItem text="Create" link="/auction/nest/create" />
                    <MenuItem text="Explore" link="/auction/nest/explorer" />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </PopoverContent>
        </Popover>
        <hr className={styles.hr} />
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>
              <AiOutlineLineChart />
              <div>DeFi</div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            bg="rgba(0, 4, 81, 0.4)"
            maxWidth="90%"
            marginLeft="7%"
          >
            <div className={styles.submenu}>
              <MenuItem
                text="Stake"
                icon={<Icon icon="ps:bank-safe" />}
                link="/defi/stake"
              />
              <MenuItem
                text="Loans"
                icon={<FaHandHoldingUsd />}
                link="/defi/loan"
              />
              <MenuItem
                text="Escrow"
                icon={<Icon icon="mdi:bank" />}
                link="/defi/escrow"
              />
              <MenuItem
                text="Freelance"
                icon={<SiFreelancer />}
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
        <hr className={styles.hr} />
      </>
    );
  };

  const Balance = ({ title, icon, value }) => {
    return (
      <div className={styles.balance}>
        <span>{title}</span>
        <div className={styles.info}>
          {icon ? (
            <img src={icon} alt="" style={{ width: "32px", height: "32px" }} />
          ) : (
            <></>
          )}
          <div className={styles.value}>
            {isNaN(value) ? value : parseFloat(value).toFixed(4)}
          </div>
        </div>
      </div>
    );
  };
  const Balances = () => {
    return (
      <>
        <Balance
          title={"HASH Balance"}
          icon={HASH}
          value={walletState.hash_balance}
        />
        <Balance
          title={"RKMT Balance"}
          icon={RKMT}
          value={walletState.rkmt_balance}
        />
        <Balance
          title={"USDT Balance"}
          icon={USDT}
          value={walletState.usdt_balance}
        />
        <Balance
          title={"WAVES Balance"}
          icon={WAVES}
          value={walletState.waves_balance}
        />
        <Balance title={"Your Address"} value={walletState.address} />
      </>
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      style={{ width: "100%" }}
    >
      <DrawerOverlay />
      <DrawerContent
        style={{
          backgroundColor: theme.menuBackground,
          color: "white",
          opacity: "0.9",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <DrawerCloseButton marginRight="15px" />
        <DrawerBody>
          <div className={styles.routes} ref={ref}>
            <div
              className={styles.link}
              onClick={() => {
                onClose();
                gotoPage("/");
              }}
            >
              <FaHome />
              <div>Home</div>
            </div>
            <hr className={styles.hr} />
            <div
              className={styles.link}
              onClick={() => {
                onClose();
                gotoPage("/explorer");
              }}
            >
              <FaCertificate />
              <div>Certification Explorer</div>
            </div>
            <hr className={styles.hr} />
            {walletState.address && <AuthRoutes />}
            <div
              className={styles.link}
              onClick={() => {
                onClose();
                gotoPage("/about");
              }}
            >
              <AiOutlineQuestion />
              <div>About</div>
            </div>
            <hr className={styles.hr} />
            <div
              className={styles.link}
              onClick={() => {
                onClose();
                gotoPage("/faq");
              }}
            >
              <Icon icon="wpf:faq" />
              <div>F.A.Q.</div>
            </div>
            <hr className={styles.hr} />
            <div
              className={styles.link}
              onClick={() => {
                onClose();
                gotoPage("/usecase");
              }}
            >
              <HiOutlineLightBulb />
              <div>Use Cases</div>
            </div>
            <hr className={styles.hr} />
          </div>
          <ColorModeSwitcher
            theme={theme}
            setTheme={setTheme}
            className={styles.colorModeSwitcher}
          />
          <div className={styles.balances}>
            {walletState.address && <Balances />}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default walletContainer(HashgreedDrawer);
