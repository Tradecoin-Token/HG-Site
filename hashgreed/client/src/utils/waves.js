import { Signer } from "@waves/signer";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { base58Encode, stringToBytes } from "@waves/ts-lib-crypto";
import { nodeInteraction } from "@waves/waves-transactions";

import moment from "moment";

import WavesConfig from "config/waves";
import AlertUtils from "utils/alert";
import axios from "axios";

const getAccountData = async (address, key) => {
  try {
    const result = await axios.get(
      `${WavesConfig.NODE_URL}/addresses/data/${address}/${key}`
    );
    if (result.data.error) return null;
    return result.data.value;
  } catch (e) {
    return null;
  }
};

const unlockWallet = async (link, callback, error_callback) => {
  try {
    window.waves = new Signer({ NODE_URL: WavesConfig.NODE_URL });
    const provider = link === "SEED" ? new ProviderWeb() : new ProviderCloud();
    window.waves.setProvider(provider);
    const user = await window.waves.login();
    if (callback) {
      callback(user.address, user.publicKey);
    }
  } catch (e) {
    if (error_callback) {
      error_callback();
    }
    console.error(e);
  }
};
const getBalance = async (callback, error_callback) => {
  try {
    if (window.waves) {
      const balances = await window.waves.getBalance();
      var rkmt_balance = 0,
        hash_balance = 0,
        usdt_balance = 0,
        waves_balance = 0,
        busd_balance = 0,
        kusd_balance = 0,
        usdc_balance = 0,
        btc_balance = 0,
        usdn_balance = 0;
      balances.forEach((item) => {
        switch (item.assetId) {
          case WavesConfig.WAVES_ID:
            waves_balance = item.amount / 10 ** WavesConfig.WAVES_DECIMALS;
            break;
          case WavesConfig.BUSD_ID:
            busd_balance = item.amount / 10 ** WavesConfig.BUSD_DECIMALS;
            break;
          case WavesConfig.USDT_ID:
            usdt_balance = item.amount / 10 ** WavesConfig.USDT_DECIMALS;
            break;
          case WavesConfig.USDC_ID:
            usdc_balance = item.amount / 10 ** WavesConfig.USDC_DECIMALS;
            break;
          case WavesConfig.BTC_ID:
            btc_balance = item.amount / 10 ** WavesConfig.BTC_DECIMALS;
            break;
          case WavesConfig.USDN_ID:
            usdn_balance = item.amount / 10 ** WavesConfig.USDN_DECIMALS;
            break;
          case WavesConfig.HASH_ID:
            hash_balance = item.amount / 10 ** WavesConfig.HASH_DECIMALS;
            break;
          case WavesConfig.KUSD_ID:
            kusd_balance = item.amount / 10 ** WavesConfig.KUSD_DECIMALS;
            break;
          case WavesConfig.RKMT_ID:
            rkmt_balance = item.amount / 10 ** WavesConfig.RKMT_DECIMALS;
            break;
          default:
        }
      });
      if (callback) {
        callback({
          waves_balance,
          busd_balance,
          usdt_balance,
          usdc_balance,
          btc_balance,
          usdn_balance,
          hash_balance,
          kusd_balance,
          rkmt_balance,
        });
      }
    }
  } catch (e) {
    console.error(e);
    if (error_callback) error_callback();
  }
};
const getDecimalFromAssetId = (assetId) => {
  switch (assetId) {
    case WavesConfig.WAVES_ID:
      return WavesConfig.WAVES_DECIMALS;
    case WavesConfig.BUSD_ID:
      return WavesConfig.BUSD_DECIMALS;
    case WavesConfig.USDT_ID:
      return WavesConfig.USDT_DECIMALS;
    case WavesConfig.USDC_ID:
      return WavesConfig.USDC_DECIMALS;
    case WavesConfig.BTC_ID:
      return WavesConfig.BTC_DECIMALS;
    case WavesConfig.ETH_ID:
      return WavesConfig.ETH_DECIMALS;
    case WavesConfig.BNB_ID:
      return WavesConfig.BNB_DECIMALS;
    case WavesConfig.USDN_ID:
      return WavesConfig.USDN_DECIMALS;
    case WavesConfig.HASH_ID:
      return WavesConfig.HASH_DECIMALS;
    case WavesConfig.KUSD_ID:
      return WavesConfig.KUSD_DECIMALS;
    case WavesConfig.RKMT_ID:
      return WavesConfig.RKMT_DECIMALS;
    default:
      return 0;
  }
};
const send = async (recipient, amount, comment, assetId) => {
  try {
    if (window.waves) {
      let transfer = {
        recipient: recipient,
        amount: amount * 10 ** getDecimalFromAssetId(assetId),
        assetId: assetId,
      };
      if (comment) {
        transfer.attachment = base58Encode(stringToBytes(comment));
      }
      await window.waves.transfer(transfer).broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const getBalanceFromAssetId = (walletState, assetId) => {
  switch (assetId) {
    case WavesConfig.WAVES_ID:
      return walletState.waves_balance;
    case WavesConfig.BUSD_ID:
      return walletState.busd_balance;
    case WavesConfig.USDT_ID:
      return walletState.usdt_balance;
    case WavesConfig.USDC_ID:
      return walletState.usdc_balance;
    case WavesConfig.BTC_ID:
      return walletState.btc_balance;
    case WavesConfig.USDN_ID:
      return walletState.usdn_balance;
    case WavesConfig.HASH_ID:
      return walletState.hash_balance;
    case WavesConfig.KUSD_ID:
      return walletState.kusd_balance;
    case WavesConfig.RKMT_ID:
      return walletState.rkmt_balance;
    default:
      return 0;
  }
};

const masssend = async (recipients, comment, assetId) => {
  try {
    if (window.waves) {
      let massTransfer = {
        transfers: [],
        assetId: assetId,
        fee: 0.001 * recipients.length * 10 ** WavesConfig.WAVES_DECIMALS,
      };
      recipients.forEach((recipient) => {
        massTransfer.transfers.push({
          recipient: recipient.address,
          amount: recipient.amount * 10 ** getDecimalFromAssetId(assetId),
        });
      });
      if (comment) {
        massTransfer.attachment = base58Encode(stringToBytes(comment));
      }
      await window.waves.massTransfer(massTransfer).broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const CertifyFile = async (
  reference,
  hash,
  uuid,
  timestamp,
  publicKey,
  certFee,
  transactionFee
) => {
  try {
    if (window.waves) {
      const tx = await window.waves
        .invoke({
          dApp: WavesConfig.SMART_CONTRACT,
          payment: [
            {
              assetId: WavesConfig.RKMT_ID,
              amount: certFee * 10 ** WavesConfig.RKMT_DECIMALS,
            },
          ],
          fee: transactionFee * 10 ** WavesConfig.WAVES_DECIMALS,
          call: {
            function: "fileCertification",
            args: [
              {
                type: "string",
                value: hash,
              },
              {
                type: "string",
                value: reference,
              },
              {
                type: "string",
                value: uuid,
              },
              {
                type: "string",
                value: JSON.stringify({
                  hash: hash,
                  timestamp: timestamp,
                  title: reference,
                }),
              },
              {
                type: "string",
                value: publicKey,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return tx;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
  return null;
};

const RevokeCertificate = async (txid, publicKey, certFee, transactionFee) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.SMART_CONTRACT,
          payment: [
            {
              assetId: WavesConfig.RKMT_ID,
              amount: certFee * 10 ** WavesConfig.RKMT_DECIMALS,
            },
          ],
          fee: transactionFee * 10 ** WavesConfig.WAVES_DECIMALS,
          call: {
            function: "revokeCertification",
            args: [
              {
                type: "string",
                value: txid,
              },
              {
                type: "string",
                value: publicKey,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const CertifyEmail = async (
  reference,
  uuid,
  domain,
  timestamp,
  publicKey,
  certFee,
  transactionFee
) => {
  try {
    if (window.waves) {
      let json = {
        messageid: uuid + "@" + domain,
        timestamp: timestamp,
        reference: reference,
      };
      const tx = await window.waves
        .invoke({
          dApp: WavesConfig.SMART_CONTRACT,
          payment: [
            {
              assetId: WavesConfig.RKMT_ID,
              amount: certFee * 10 ** WavesConfig.RKMT_DECIMALS,
            },
          ],
          fee: transactionFee * 10 ** WavesConfig.WAVES_DECIMALS,
          call: {
            function: "emailCertification",
            args: [
              {
                type: "string",
                value: domain,
              },
              {
                type: "string",
                value: reference,
              },
              {
                type: "string",
                value: uuid,
              },
              {
                type: "string",
                value: JSON.stringify(json),
              },
              {
                type: "string",
                value: publicKey,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return tx;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
  return null;
};

const CertifyMutual = async (
  reference,
  hash,
  recp,
  uuid,
  timestamp,
  publicKey,
  certFee,
  transactionFee
) => {
  try {
    if (window.waves) {
      let json = {
        title: reference,
        timestamp: timestamp,
        hash: hash,
        creator: "",
      };
      recp.forEach((rec, index) => {
        json["address" + (index + 1)] = rec;
      });
      const tx = await window.waves
        .invoke({
          dApp: WavesConfig.SMART_CONTRACT,
          payment: [
            {
              assetId: WavesConfig.RKMT_ID,
              amount: certFee * 10 ** WavesConfig.RKMT_DECIMALS,
            },
          ],
          fee: Math.round(transactionFee * 10 ** WavesConfig.WAVES_DECIMALS),
          call: {
            function: "createAgreement",
            args: [
              {
                type: "string",
                value: hash,
              },
              {
                type: "string",
                value: reference,
              },
              {
                type: "string",
                value: JSON.stringify(json),
              },
              {
                type: "string",
                value: recp.join(","),
              },
              {
                type: "string",
                value: publicKey,
              },
              {
                type: "string",
                value: uuid,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return tx;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
  return null;
};

const SignMutual = async (hash, agreementId, publicKey) => {
  try {
    if (window.waves) {
      const tx = await window.waves
        .invoke({
          dApp: WavesConfig.SMART_CONTRACT,
          call: {
            function: "signAgreement",
            args: [
              {
                type: "string",
                value: hash,
              },
              {
                type: "string",
                value: agreementId,
              },
              {
                type: "string",
                value: publicKey,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return tx;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
  return null;
};

const DepositBUSD = async (amount) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.STAKE_SCRIPT,
          payment: [
            {
              assetId: WavesConfig.BUSD_ID,
              amount: amount * 10 ** WavesConfig.BUSD_DECIMALS,
            },
          ],
          call: {
            function: "depositBUSD",
            args: [],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const WithdrawKUSD = async (amount) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.STAKE_SCRIPT,
          call: {
            function: "withdrawKUSD",
            args: [
              {
                type: "integer",
                value: amount,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const StakedBUSD = async (address, callback) => {
  try {
    var data = await nodeInteraction.accountData(
      WavesConfig.STAKE_SCRIPT,
      WavesConfig.NODE_URL
    );
    if (address in data && callback)
      callback(data[address].value / 10 ** WavesConfig.BUSD_DECIMALS);
  } catch (e) {
    console.error(e);
  }
};

const StartAuction = async (
  duration,
  startingPrice,
  priceAssetID,
  nftAssetID,
  nftAssetAmount
) => {
  try {
    if (window.waves) {
      const price_decimals = await getAssetDecimals(priceAssetID);
      const nft_decimals = await getAssetDecimals(nftAssetID);
      const tx = await window.waves
        .invoke({
          dApp: WavesConfig.NFT_SCRIPT,
          payment: [
            {
              assetId: nftAssetID,
              amount: nftAssetAmount * 10 ** nft_decimals,
            },
          ],
          call: {
            function: "startAuction",
            args: [
              {
                type: "integer",
                value: duration,
              },
              {
                type: "integer",
                value: startingPrice * 10 ** price_decimals,
              },
              {
                type: "string",
                value: priceAssetID,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return tx;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
  return null;
};

const WithdrawAuction = async (auctionID) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.NFT_SCRIPT,
          call: {
            function: "withdraw",
            args: [
              {
                type: "string",
                value: auctionID,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};


const ExpediteAuction = async (auctionID) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.NFT_SCRIPT,
          call: {
            function: "Expedite",
            args: [
              {
                type: "string",
                value: auctionID,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const BidAuction = async (auctionID, bidAmount, bidAssetID) => {
  try {
    if (window.waves) {
      const bid_decimals = await getAssetDecimals(bidAssetID);
      await window.waves
        .invoke({
          dApp: WavesConfig.NFT_SCRIPT,
          payment: [
            {
              assetId: bidAssetID,
              amount: bidAmount * 10 ** bid_decimals,
            },
          ],
          call: {
            function: "bid",
            args: [
              {
                type: "string",
                value: auctionID,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      await axios.post("/api/certifications/getLoanStatus", {
        auctionID,
        bidAmount,
        bidAssetID,
      });
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const sportBidAuction = async (auctionID, bidAmount) => {
  try {
    if (window.waves) {
      const bid_decimals = WavesConfig.USDT_DECIMALS;
      await window.waves
        .invoke({
          dApp: WavesConfig.SPORT_SCRIPT,
          payment: [
            {
              assetId: WavesConfig.USDT_ID,
              amount: bidAmount * 10 ** bid_decimals,
            },
          ],
          call: {
            function: "bid",
            args: [
              {
                type: "string",
                value: auctionID,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const CreateLoan = async (days, amount) => {
  try {
    if (window.waves) {
      const tx = await window.waves
        .invoke({
          dApp: WavesConfig.LOAN_SCRIPT,
          payment: [
            {
              assetId: WavesConfig.WAVES_ID,
              amount: amount * 10 ** WavesConfig.WAVES_DECIMALS,
            },
          ],
          call: {
            function: "RequestLoan",
            args: [
              {
                type: "integer",
                value: days,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return tx;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
  return null;
};

const RepayLoan = async (assetId, amount) => {
  const decimals = await getAssetDecimals(assetId);
  try {
    if (window.waves) {
      const tx = await window.waves
        .invoke({
          dApp: WavesConfig.LOAN_SCRIPT,
          payment: [
            {
              assetId: assetId,
              amount: amount * 10 ** decimals,
            },
          ],
          call: {
            function: "RepayLoan",
            args: [],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return tx;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
  return null;
};

const getAccessToken = async (publicKey) => {
  const client_id = "waves.exchange";
  const chain_code = "W";
  const seconds = Math.round((Date.now() + 1000 * 60 * 60 * 24 * 7) / 1000);
  const message = `${chain_code}:${client_id}:${seconds}`;
  const signature = await window.waves.signMessage(message);
  const url = `https://api.waves.exchange/v1/oauth2/token`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: [
      "grant_type=password",
      "scope=general",
      `username=${encodeURIComponent(publicKey)}`,
      "password=" + encodeURIComponent(`${seconds}:${signature}`),
      `client_id=${client_id}`,
    ].join("&"),
  }).then((result) => result.json());

  return data.access_token;
};

const getGatewayAddress = async (currency, platform, accessToken) => {
  const res = await fetch(
    `https://api.waves.exchange/v1/deposit/addresses/${currency}/${platform}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) return null;
  const result = await res.json();
  return result["deposit_addresses"];
};

const registerNFTSeries = async (
  name,
  description,
  startCounter,
  endCounter
) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.NFT_MINT_SCRIPT,
          call: {
            function: "RegisterNFTSeries",
            args: [
              {
                type: "string",
                value: name,
              },
              {
                type: "string",
                value: description,
              },
              {
                type: "integer",
                value: startCounter,
              },
              {
                type: "integer",
                value: endCounter,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const issueNFTSeries = async (seriesName) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.NFT_MINT_SCRIPT,
          call: {
            function: "IssueNFTSeries",
            args: [
              {
                type: "string",
                value: seriesName,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
  }
};

const getTx = async (txid) => {
  try {
    const result = await axios.get(
      `${WavesConfig.NODE_URL}/transactions/info/${txid}`
    );
    return result.data;
  } catch (e) {
    return {};
  }
};

const getUserNfts = async (address, limit, after, callback) => {
  try {
    const result = await axios.get(
      `${WavesConfig.NODE_URL}/assets/nft/${address}/limit/${limit}${
        after !== "" ? "?after=" + after : ""
      }`
    );
    const getDetails = async (item) => {
      const txid = item.originTransactionId;
      const tx = await getTx(txid);
      return {
        id: item.assetId,
        name: item.name,
        description: item.description,
        timestamp: item.issueTimestamp,
        txid,
        creator: tx.sender || "",
      };
    };
    const data = result.data;
    let nftList = [];
    for (let idx = 0; idx < data.length; ++idx) {
      const item = data[idx];
      const details = await getDetails(item);
      nftList.push(details);
    }
    if (callback) callback(nftList);
  } catch (e) {
    if (callback) callback([]);
  }
};

const getNftCreator = async (assetId, callback) => {
  try {
    const result = await axios.get(
      `${WavesConfig.NODE_URL}/assets/details/${assetId}`
    );
    const { data } = result;
    const tx = await getTx(data.originTransactionId);
    if (callback) callback(tx.sender);
  } catch (e) {}
};

let assetsList = {};

const getAssetInfo = async (assetID, callback) => {
  if (assetID === null) assetID = "WAVES";
  if (assetsList[assetID] !== undefined) return assetsList[assetID];
  let data = {};
  try {
    if (assetID.toUpperCase() === "WAVES")
      data = {
        name: "WAVES",
        decimals: 8,
        description: "Native token of WAVES blockchain",
        issuer: "",
      };
    else {
      const asset = await axios.get(
        WavesConfig.NODE_URL + "/assets/details/" + assetID
      );
      if (asset.data) {
        data = asset.data;
      }
    }
    assetsList[assetID] = data;
    if (callback) callback(data);
    return data;
  } catch (e) {}
};

const getAssetDecimals = async (assetID) => {
  try {
    const asset = await axios.get(
      WavesConfig.API_URL + "/v0/assets/" + assetID
    );
    return asset.data.data.precision;
  } catch (e) {
    return 0;
  }
};

const lockittyDeposit = async (amount) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.LOCKITTY_SCRIPT,
          payment: [
            {
              assetId: WavesConfig.BUSD_ID,
              amount: amount * 10 ** WavesConfig.BUSD_DECIMALS,
            },
          ],
          call: {
            function: "DepositFunds",
            args: [],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return true;
    }
  } catch (e) {
    console.error(e);
    AlertUtils.SystemAlert(e);
    return false;
  }
};

const lockittyGetLeft = async (address) => {
  const left = await getAccountData(
    WavesConfig.LOCKITTY_SCRIPT,
    `${address}_Liq`
  );
  return left === null ? 0 : left / 10 ** WavesConfig.BUSD_DECIMALS;
};

const lockittyGetDeposit = async (address) => {
  const deposit = await getAccountData(
    WavesConfig.LOCKITTY_SCRIPT,
    `${address}_Deposit`
  );
  return deposit === null ? 0 : deposit / 10 ** WavesConfig.BUSD_DECIMALS;
};

const lockittyGetInfo = async (address) => {
  const deposit = await lockittyGetDeposit(address);
  const left = await lockittyGetLeft(address);
  return {
    deposit,
    left,
  };
};

const lockittyGetNumWithdraws = async (address) => {
  const count = await getAccountData(
    WavesConfig.LOCKITTY_SCRIPT,
    `${address}_trxUnstake`
  );
  return count === null ? 0 : count;
};

const lockittyGetLastWithdrawTime = async (address) => {
  const withdrawBlock = await getAccountData(
    WavesConfig.LOCKITTY_SCRIPT,
    `${address}_LastUnstake`
  );
  return withdrawBlock;
};

const lockittyGetWithdrawInfo = async (address) => {
  const left = await lockittyGetLeft(address);
  const count = await lockittyGetNumWithdraws(address);
  const withdrawBlock = await lockittyGetLastWithdrawTime(address);
  return { left, count, withdrawBlock };
};
// timestamp should be given in miliseconds
const getLastBlock = async (timestamp) => {
  const result = await axios.get(
    `${WavesConfig.NODE_URL}/blocks/heightByTimestamp/${timestamp}`
  );
  if (result.status !== 200) return -1; // error occured
  return result.data.height;
};

const lockittyWithdraw = async () => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.LOCKITTY_SCRIPT,
          call: {
            function: "WithdrawLiq",
            args: [],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return true;
    }
  } catch (e) {
    console.log(e);
    AlertUtils.SystemAlert(e);
    return false;
  }
};

const getTxStatus = async (txId) => {
  try {
    const result = await axios.get(
      `${WavesConfig.NODE_URL}/transactions/status?id=${txId}`
    );
    if (result.status !== 200) return "";
    return result.data[0].status;
  } catch (e) {
    return "";
  }
};

const lockittyTransactions = async (address, limit, callback) => {
  let transactions = [];
  try {
    const result = await axios.get(
      `${
        WavesConfig.API_URL
      }/v0/transactions/invoke-script?sender=${address}&dapp=${
        WavesConfig.LOCKITTY_SCRIPT
      }&sort=desc${limit ? "&limit=" + limit : ""}`
    );
    const data = result?.data?.data;
    if (data) {
      for (let idx = 0; idx < data.length; ++idx) {
        const item = data[idx].data;
        const type =
          item.call.function === "WithdrawLiq" ? "Withdraw" : "Deposit";
        const txId = item.id;
        const tx = await getTx(txId);
        const status = await getTxStatus(txId);
        let amount = 0;
        if (type === "Withdraw") {
          tx.stateChanges.transfers.forEach((item) => {
            if (item.address === address) {
              amount = item.amount / 10 ** WavesConfig.BUSD_DECIMALS;
            }
          });
        } else {
          item.payment.forEach(({ assetId, amount: _amount }) => {
            if (assetId === WavesConfig.BUSD_ID) amount = _amount;
          });
        }
        transactions.push({
          amount,
          type,
          timestamp: tx.timestamp,
          status: status === "confirmed" ? "Completed" : "Pending",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
  if (callback) callback(transactions);
};

const hashGigDepositFund = async (
  scope,
  deliverable,
  address,
  tokenId,
  amount
) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.HASHGIG_SCRIPT,
          call: {
            function: "DepositFunds",
            args: [
              {
                type: "string",
                value: scope,
              },
              {
                type: "string",
                value: deliverable,
              },
              {
                type: "string",
                value: address,
              },
            ],
          },
          payment: [
            {
              assetId: tokenId,
              amount: amount * 10 ** getDecimalFromAssetId(tokenId),
            },
          ],
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return true;
    }
  } catch (e) {
    AlertUtils.SystemAlert(e);
    return false;
  }
};

const hashGigPayFreelancer = async (amount) => {
  try {
    if (window.waves) {
      await window.waves
        .invoke({
          dApp: WavesConfig.HASHGIG_SCRIPT,
          call: {
            function: "PayFreelancer",
            args: [
              {
                type: "integer",
                value: amount,
              },
            ],
          },
          chainId: WavesConfig.CHAIN_ID,
        })
        .broadcast();
      return true;
    }
  } catch (e) {
    AlertUtils.SystemAlert(e);
    return false;
  }
};

const hashGigGetLastPayTime = async (address) => {
  const result =
    await axios.get(`${WavesConfig.API_URL}/v0/transactions/invoke-script?sender=${address}&dapp=${WavesConfig.HASHGIG_SCRIPT}&function=PayFreelancer&sort=desc&limit=1
  `);
  if (result.status !== 200) return "";
  return result?.data?.data[0]?.data?.timestamp;
};

const hashGigGetInfo = async (address) => {
  const assetId = await getAccountData(
    WavesConfig.HASHGIG_SCRIPT,
    `${address}_Asset`
  );
  const amount = await getAccountData(
    WavesConfig.HASHGIG_SCRIPT,
    `${address}_Payment`
  );
  const numPays = await getAccountData(
    WavesConfig.HASHGIG_SCRIPT,
    `${address}_Paidtrx`
  );
  let name = "";
  let decimals = 0;
  if (assetId) {
    const assetInfo = await getAssetInfo(assetId);
    if (assetInfo) {
      name = assetInfo.name;
      decimals = assetInfo.decimals;
    }
  }
  let lastPayTime = "";
  // get last transaction time
  lastPayTime = await hashGigGetLastPayTime(address);
  return {
    numPays: !numPays ? 0 : numPays,
    amount: !amount ? 0 : amount,
    name: !name ? "" : name,
    decimals: !decimals ? 0 : decimals,
    lastPayTime: !lastPayTime ? "" : lastPayTime,
  };
};

const getAliasList = async (address) => {
  try {
    const res = await axios.get(
      `${WavesConfig.NODE_URL}/alias/by-address/${address}`
    );
    if (res.status !== 200) return "";
    if (res.data.length) {
      return res.data.map((alias) => alias.substring(8));
    }
  } catch (e) {}
  return "";
};

const getAddressByAlias = async (alias) => {
  try {
    const res = await axios.get(
      encodeURI(`${WavesConfig.NODE_URL}/alias/by-alias/${alias}`)
    );
    if (res.status !== 200) return "";
    return res.data.address;
  } catch (e) {}
  return "";
};

const createAlias = async (address, alias) => {
  try {
    if (window.waves) {
      await window.waves
        .alias({
          alias,
        })
        .broadcast();
      return true;
    }
  } catch (e) {
    console.log(e);
    AlertUtils.SystemAlert(e);
    return false;
  }
};

const hahsGigGetGigList = async (address) => {
  try {
    const result = await axios.get(
      `${WavesConfig.API_URL}/v0/transactions/invoke-script?sender=${address}&dapp=${WavesConfig.HASHGIG_SCRIPT}&function=DepositFunds&sort=desc`
    );
    const data = result.data.data;
    let gigList = [];
    for (let idx = 0; idx < data.length; ++idx) {
      const item = data[idx].data;
      let gig = [];

      gig.push(item.id);

      item.call.args.forEach(({ value }) => {
        gig.push(value);
      });
      const { amount, assetId } = item.payment[0];
      const assetInfo = await getAssetInfo(assetId);
      const { name } = assetInfo;
      gig.push(amount);
      gig.push(name);
      gig.push(moment(item.timestamp).format("DD/MM/YYYY"));

      gigList.push(gig);
    }
    return gigList;
  } catch (e) {
    return [];
  }
};

const hashGigGetPaymentHistory = async (address) => {
  try {
    const result = await axios.get(
      `${WavesConfig.API_URL}/v0/transactions/invoke-script?sender=${address}&dapp=${WavesConfig.HASHGIG_SCRIPT}&function=PayFreelancer&sort=desc`
    );
    const data = result.data.data;

    let history = [];

    for (let idx = 0; idx < data.length; ++idx) {
      let payment = [];

      const item = data[idx].data;
      const { id: txId } = item;
      const tx = await getTx(txId);
      if (tx.stateChanges === undefined) continue;
      const { data: argData, transfers } = tx.stateChanges;
      let numPays = 0;
      argData.forEach(({ key, value }) => {
        if (key === `${address}_Paidtrx`) numPays = value;
      });
      const amount = item.call.args[0].value;
      const assetId = transfers[0].asset;
      const assetInfo = await getAssetInfo(assetId);
      let freelancerAddress = "";
      transfers.forEach(({ address }) => {
        if (address !== WavesConfig.HASHGIG_FEE) freelancerAddress = address;
      });
      payment.push(txId);
      payment.push(freelancerAddress);
      payment.push(amount);
      payment.push(assetInfo.name);
      payment.push(`${numPays + 1} out of 12`);
      payment.push(moment(tx.timestamp).format("DD/MM/YYYY"));

      history.push(payment);
    }
    return history;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const WavesUtils = {
  unlockWallet,
  ExpediteAuction,
  getBalance,
  send,
  masssend,
  CertifyFile,
  RevokeCertificate,
  CertifyEmail,
  CertifyMutual,
  SignMutual,
  DepositBUSD,
  WithdrawKUSD,
  StakedBUSD,
  StartAuction,
  WithdrawAuction,
  BidAuction,
  sportBidAuction,
  CreateLoan,
  RepayLoan,
  getBalanceFromAssetId,
  getAccessToken,
  getGatewayAddress,
  registerNFTSeries,
  issueNFTSeries,
  getUserNfts,
  getNftCreator,
  lockittyGetInfo,
  getAssetDecimals,
  getAssetInfo,
  lockittyDeposit,
  lockittyGetWithdrawInfo,
  getLastBlock,
  lockittyWithdraw,
  lockittyTransactions,
  hashGigDepositFund,
  hashGigPayFreelancer,
  hashGigGetInfo,
  hahsGigGetGigList,
  hashGigGetPaymentHistory,
  getAliasList,
  getAddressByAlias,
  createAlias,
};
export default WavesUtils;
