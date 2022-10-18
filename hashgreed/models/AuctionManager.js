const { nodeUrl, nftContract } = require("../config/keys");
const axios = require("axios");
const Auction = require("./Auction");

class AuctionManager {
  constructor() {
    // console.log("AuctionManager --> constructor");

    this.auctions = [];
    this.timestamp = -1;
    this.DATA_UPDATE_INTERVAL = 10 * 60 * 1000;
    this.updatePromise = null;
    this.waiting = 0;

    this.updateData();
  }

  async updateData() {
    const loadData = async () => {
      const multiAvatars = ["HashDealz", "ServiceNFTs", "ArtNFTs"];
      const mapping = [
        { suffix: "_lot_amount", field: "nft_amount" },
        { suffix: "_lot_assetId", field: "nft_id" },
        { suffix: "_organizer", field: "organizer" },
        { suffix: "_priceAssetId", field: "price_id" },
        { suffix: "_startPrice", field: "price" },
        { suffix: "_winAmount", field: "bid" },
        { suffix: "_winner", field: "winner" },
        { suffix: "_lot_passed", field: "operator" },
      ];

      const url = `${nodeUrl}/addresses/data/${nftContract}`;
      const time_fetch = Date.now();
      const { data: auctionData } = await axios.get(url);
      console.log(
        `fetching contract account data took ${Date.now() - time_fetch}ms`
      );

      const time_db = Date.now();
      const auctionDb = await Auction.find({
        txid: { $regex: /_original$/ },
      }).exec();

      console.log(`fetching MongoDB took ${Date.now() - time_db}ms`);

      auctionDb.sort((x, y) => {
        return x.txid < y.txid ? -1 : 1;
      });

      auctionDb.forEach((item) => {
        item.txid = item.txid.replace("_original", "");
      });

      let auctions = [];
      let auctionId = "";
      let dbIdx = 0;

      const dbRows = auctionDb.length;
      let missing = 0;

      auctionData.forEach(({ key, value }) => {
        if (key.indexOf("_") === -1) {
          auctionId = key;
          auctions.push({
            id: key,
            end_block: value,
          });
          let auction = auctions[auctions.length - 1];

          while (dbIdx < dbRows && auctionDb[dbIdx].txid < key) {
            ++dbIdx;
          }

          if (dbIdx < dbRows && auctionDb[dbIdx].txid === key) {
            const db = auctionDb[dbIdx];
            auction.assetType = db.assetType;
            auction.assetName = db.assetName;
            auction.assetComment = db.assetComment;
            auction.avatar = db.link;
            if (
              multiAvatars.reduce(
                (result, typeStr) =>
                  result | (db.assetType.indexOf(typeStr) !== -1),
                false
              )
            ) {
              auction.avatars = [];
              while (dbIdx < dbRows && auctionDb[dbIdx].txid === key) {
                auction.avatars.push(auctionDb[dbIdx].link);
                ++dbIdx;
              }
            }
          } else {
            auction.avatar = null;
            auction.avatars = null;
            auction.assetType = null;
            auction.assetName = null;
            auction.assetComment = null;
            ++missing;
          }
        } else {
          mapping.forEach(({ suffix, field }) => {
            if (auctionId + suffix !== key) return;
            if (auctions.length === 0) return;
            auctions[auctions.length - 1][field] = value;
          });
        }
      });
      console.log(`loaded ${auctions.length} items`);
      console.log("missing: ", missing);
      auctions.sort((x, y) => {
        if (!x.operator && y.operator) return -1;
        if (x.operator && !y.operator) return 1;

        if (x.end_block > y.end_block) return -1;
        if (x.end_block < y.end_block) return 1;

        return 0;
      });
      return auctions;
    };

    ++this.waiting;
    try {
      if (this.updatePromise !== null) {
        await this.updatePromise;
      } else if (
        this.timestamp === -1 ||
        Date.now() - this.timestamp > this.DATA_UPDATE_INTERVAL
      ) {
        console.log("need to update data");

        console.log("---> updating auction data...");

        this.updatePromise = loadData();

        const time = Date.now();

        this.timestamp = Date.now();

        const data = await this.updatePromise;
        this.auctions = data;
        this.timestamp = Date.now();

        console.log(`load data successful. took ${Date.now() - time}ms`);
      }
    } catch (error) {
      console.log("error occured while loading data");
      console.error(error);
    }
    --this.waiting;
    if (this.waiting === 0) {
      this.updatePromise = null;
    }
  }

  async getData() {
    await this.updateData();
    return this.auctions;
  }
}

module.exports = new AuctionManager();
