const Reaction = require("../../models/Reaction");
const express = require("express");
const router = express.Router();

router.post("/status", async (req, res) => {
  const { auctionId, address } = req.body;
  try {
    const count = await Reaction.countDocuments({
      auctionId,
      like: true,
    });
    const status = await Reaction.findOne({
      auctionId,
      user: address,
    }).select("like");
    return res.status(200).json({
      count,
      like: !status ? false : status.like,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});

router.post("/react", async (req, res) => {
  try {
    const { auctionId, address, like } = req.body;
    const result = await Reaction.findOneAndUpdate(
      {
        auctionId,
        user: address,
      },
      {
        like,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: true,
      }
    );
    return res.status(200).json("Success");
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
});
module.exports = router;
