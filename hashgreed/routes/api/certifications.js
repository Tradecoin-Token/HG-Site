const express = require("express");
const router = express.Router();
const { nodeInteraction } = require("@waves/waves-transactions");
const fs = require("fs");
const moment = require("moment");
const puppeteer = require("puppeteer");
const QRCode = require("qrcode");

const {
  nodeUrl,
  smartContract,
  stakeContract,
  loanContract,
  baseUrl,
  sportContract,
} = require("../../config/keys");
const File = require("../../models/File");
const Auction = require("../../models/Auction");
const auctionManager = require("../../models/AuctionManager");

router.post("/filterCertifications", async (req, res) => {
  try {
    const { filter } = req.body;
    let certificates = await nodeInteraction.accountData(
      {
        address: smartContract,
        match: filter,
      },
      nodeUrl
    );
    return res.status(200).json(certificates);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/getCertifications", async (req, res) => {
  try {
    const { filter } = req.body;
    let certificates = await nodeInteraction.accountData(
      {
        address: smartContract,
        match: filter,
      },
      nodeUrl
    );
    result = [];
    for (key in certificates) {
      let value = JSON.parse(certificates[key].value);
      value.key = key;
      const txid = key.split("_")[2];
      const found = await File.find({ txid }).limit(1).exec();
      if (found.length > 0) value.link = found[0].link;
      result.push(value);
    }
    result.sort((x, y) => {
      if (x.timestamp > y.timestamp) return -1;
      if (x.timestamp < y.timestamp) return 1;
      return 0;
    });
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/searchCertification", async (req, res) => {
  try {
    const { transactionID, hashID, reference } = req.body;
    let key = "NotFound";
    if (hashID) key = hashID + "([a-z0-9-]*)";
    if (reference) key = reference + "([a-z0-9-]*)";
    if (transactionID)
      key = "data_([A-Za-z]*)_" + transactionID + "_([A-Za-z0-9]*)";
    let certificates = await nodeInteraction.accountData(
      {
        address: smartContract,
        match: key,
      },
      nodeUrl
    );
    let keys = Object.keys(certificates);
    certificates = Object.values(certificates);
    if (certificates.length === 1 && !transactionID) {
      certificates = await nodeInteraction.accountData(
        {
          address: smartContract,
          match:
            "data_([A-Za-z]*)_" + certificates[0].value + "_([A-Za-z0-9]*)",
        },
        nodeUrl
      );
      keys = Object.keys(certificates);
      certificates = Object.values(certificates);
    }
    if (certificates.length === 1) {
      keys = keys[0].split("_");
      let result = JSON.parse(certificates[0].value);
      result.txid = keys[2];
      result.address = keys[3];
      result.type = keys[1];
      const found = await File.find({ txid: result.txid }).limit(1).exec();
      if (found.length > 0) result.link = found[0].link;
      return res.status(200).json(result);
    }
    return res.status(200).json(null);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/downloadCertificate", async (req, res) => {
  try {
    const { hash, hash_title, timestamp, title, txid } = req.body;
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    var html = fs.readFileSync("assets/certificate.html", "utf8");
    const qr = await QRCode.toDataURL(baseUrl + "/explorer/" + txid);
    var bgImg = fs.readFileSync("assets/certificate_bg.jpg", "base64");
    var logo = fs.readFileSync("assets/logo.jpg", "base64");
    const data = {
      title: title,
      reference: title,
      date: moment(timestamp).toString(),
      hash: hash,
      label: hash_title,
      txid: txid,
      qr: qr,
      logo: "data:image/jpg;base64," + logo,
      bgImg: "data:image/jpg;base64," + bgImg,
      baseUrl: baseUrl,
    };
    Object.keys(data).forEach((key) => {
      html = html.replace("{{" + key + "}}", data[key]);
    });
    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });
    await page.pdf({
      width: "915px",
      height: "652px",
      printBackground: true,
      path: "assets/certificate.pdf",
    });
    await browser.close();
    return res.status(200).download("assets/certificate.pdf");
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/getSportAuctions", async (req, res) => {
  try {
    let sportAuctions = await nodeInteraction.accountData(
      {
        address: sportContract,
      },
      nodeUrl
    );
    let priceAssetId = sportAuctions["priceAssetId"].value;
    let nftIds = [];
    for (key in sportAuctions) {
      if (key.includes("_id")) {
        let nftId = key.substring(0, key.indexOf("_id"));
        nftIds.push(nftId);
      }
    }
    let result = [];
    let sportAuction = {};
    for (let i = 0; i < nftIds.length; i++) {
      if (sportAuctions[nftIds[i] + "_id"]) sportAuction.id = nftIds[i];
      if (sportAuctions[nftIds[i] + "_value"])
        sportAuction.startValue = sportAuctions[nftIds[i] + "_value"].value;
      if (sportAuctions[nftIds[i] + "_name"])
        sportAuction.name = sportAuctions[nftIds[i] + "_name"].value;
      if (sportAuctions[nftIds[i] + "_winner"])
        sportAuction.winner = sportAuctions[nftIds[i] + "_winner"].value;
      if (sportAuctions[nftIds[i] + "_winAmount"])
        sportAuction.winAmount = sportAuctions[nftIds[i] + "_winAmount"].value;

      const found = await Auction.find({ txid: nftIds[i] + "_original" })
        .limit(1)
        .exec();
      if (found.length > 0) {
        sportAuction.avatar = found[0].link;
      } else {
        sportAuction.avatar = null;
      }

      result.push(sportAuction);
      sportAuction = {};
    }
    return res.status(200).json({ priceAssetId, result });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/getStakeDatas", async (req, res) => {
  try {
    const { address } = req.body;
    let stakeDatas = await nodeInteraction.accountData(
      {
        address: stakeContract,
      },
      nodeUrl
    );
    return res.status(200).json({ stakeDatas });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/getAuctions", async (req, res) => {
  try {
    const height = await nodeInteraction.currentHeight(nodeUrl);
    const data = await auctionManager.getData();

    return res.status(200).json({ height, result: data });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/bidAuction", async (req, res) => {
  try {
    const { auctionID, bidAmount, bidAssetID } = req.body;
    await auctionManager.updateData();
    return res.status(200).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/getLoanStatus", async (req, res) => {
  const { address } = req.body;
  try {
    let status = await nodeInteraction.accountData(
      {
        address: loanContract,
      },
      nodeUrl
    );
    let result = [];
    let loanStatus = { id: address };

    if (status["Borrow_height_of_" + address])
      loanStatus.borrow_height = status["Borrow_height_of_" + address].value;
    else loanStatus.borrow_height = 0;
    if (status["Collateral_Amount_Of_" + address])
      loanStatus.collateral_amount =
        status["Collateral_Amount_Of_" + address].value;
    else loanStatus.collateral_amount = 0;
    if (status["Loan_Amount_Of_" + address])
      loanStatus.loan_amount = status["Loan_Amount_Of_" + address].value;
    else loanStatus.loan_amount = 0;
    if (status["Loan_Interest_Of_" + address])
      loanStatus.loan_interest = status["Loan_Interest_Of_" + address].value;
    else loanStatus.loan_interest = 0;
    if (status["Total_Loan_Blocks_Of_" + address])
      loanStatus.total_loan_block =
        status["Total_Loan_Blocks_Of_" + address].value;
    else total_loan_block = 0;
    if (status["Total_Loan_Paid:"])
      loanStatus.total_loan_paid = status["Total_Loan_Paid:"].value;

    result.push(loanStatus);
    return res.status(200).json({ result });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

module.exports = router;
