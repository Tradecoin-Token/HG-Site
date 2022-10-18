const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReactionSchema = new Schema({
  auctionId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  like: {
    type: Boolean,
    required: true,
  },
});

module.exports = Reaction = mongoose.model("reactions", ReactionSchema);
