import React, { useContext } from "react";
import walletContainer from "redux/containers/wallet";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaPaste } from "react-icons/all";
import { ThemeContext } from "context/ThemeContext";
import { Button, Link, Spinner } from "@chakra-ui/react";
import moment from "moment";
import WavesConfig from "config/waves";
import WavesUtils from "utils/waves";
import styles from "./UserNFTs.module.scss";

function UserNFTs({ walletState }) {
  const { theme } = useContext(ThemeContext);
  const NFTS_PER_PAGE = 5;

  const [nfts, setNfts] = React.useState([]); // loaded NFTs
  const [page, setPage] = React.useState(0); // current page index
  const [totalPages, setTotalPages] = React.useState(0); // total number of pages available
  const [maxPage, setMaxPage] = React.useState(0); // maximum page index with NFTs loaded
  const [loading, setLoading] = React.useState(false);

  const onNext = () => {
    setPage(page + 1);
  };

  const onPrev = () => {
    setPage(page - 1);
  };

  React.useEffect(() => {
    const updateNftList = (newItems) => {
      const count = newItems.length;

      if (count <= NFTS_PER_PAGE) {
        setTotalPages(maxPage + 1);
      } else {
        newItems.splice(NFTS_PER_PAGE, 1);
      }
      setNfts([...nfts, ...newItems]);
      setLoading(false);
    };

    if (page > maxPage) setMaxPage(page);
    if (totalPages === 0 && nfts.length < (page + 1) * NFTS_PER_PAGE) {
      let after = "";
      if (nfts.length !== 0) after = nfts[nfts.length - 1].id;
      setLoading(true);
      WavesUtils.getUserNfts(
        walletState.address,
        NFTS_PER_PAGE + 1,
        after,
        updateNftList
      );
    }
  }, [walletState.address, page, totalPages, maxPage, nfts]);

  const Copyable = ({ text, children }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        alignItems: "center",
      }}
    >
      {children}
      <CopyToClipboard text={text}>
        <FaPaste
          className={styles.copyIcon}
          style={{ color: theme.iconBack }}
        />
      </CopyToClipboard>
    </div>
  );

  return (
    <div className={styles.UserNftContainer}>
      <div className={styles.header}>NFT Listing</div>
      <div className={styles.nftListContainer}>
        {loading ? (
          <div className={styles.loading}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : (
          nfts
            .slice(page * NFTS_PER_PAGE, (page + 1) * NFTS_PER_PAGE)
            .map((item, index) => (
              <div className={styles.nftItem} key={index}>
                {/* Name */}
                <Copyable text={item.name}>
                  <span className={styles.name}>{item.name}</span>
                </Copyable>

                {/* ID */}
                <div className={styles.field}>
                  <Copyable text={item.id}>
                    <div className={styles.fieldName}>ID</div>
                  </Copyable>
                  <span className={styles.fieldValue}>{item.id}</span>
                </div>

                {/* Description */}
                <div className={styles.field}>
                  <Copyable text={item.description}>
                    <div className={styles.fieldName}>Description</div>
                  </Copyable>
                  <div className={styles.fieldValue}>
                    {item.description.split(/\r\n|\r|\n/).map((item) =>
                      item !== "" ? (
                        <>
                          <span style={{ overflowWrap: "anywhere" }}>
                            {item}
                          </span>
                          <br />
                        </>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                </div>
                {/* Creator, Issued At, TxID */}
                <div className={styles.groupedItems}>
                  {/* Creator */}
                  <div className={styles.field}>
                    <div className={styles.fieldName}>Creator</div>
                    <span className={styles.fieldValue}>{item.creator}</span>
                  </div>
                  {/* Issued At */}
                  <div className={styles.field}>
                    <div className={styles.fieldName}>Issued At</div>
                    <span className={styles.fieldValue}>
                      {moment(item.timestamp).format("YYYY-MMM-DD HH:mm:ss")}
                    </span>
                  </div>
                  {/* TxID */}
                  <div className={styles.field}>
                    <Copyable text={item.txid}>
                      <div className={styles.fieldName}>TxID</div>
                    </Copyable>
                    <Link
                      href={`${WavesConfig.EXPLORER_URL}/tx/${item.txid}`}
                      isExternal
                      className={styles.fieldValue}
                      style={{ fontWeight: 600 }}
                    >
                      {item.txid}
                    </Link>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
      <div className={styles.navButtonsContainer}>
        <Button
          isDisabled={page === 0}
          onClick={onPrev}
          style={{ backgroundColor: theme.buttonBack }}
          className={styles.button}
        >
          Prev
        </Button>
        <Button
          isDisabled={page === totalPages - 1}
          onClick={onNext}
          style={{ backgroundColor: theme.buttonBack }}
          className={styles.button}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default walletContainer(UserNFTs);
