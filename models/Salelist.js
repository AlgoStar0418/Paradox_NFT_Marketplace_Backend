const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SalelistSchema = new Schema({
  sale_type: {
    type: Number,
    required: true,
  },
  soldout_flag: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
  },
  nft: {
    type: Schema.Types.ObjectId,
    ref: "nfts",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  starting_time: {
    type: Date,
    required: true,
  },
  expired_time: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Salelist = mongoose.model("salelists", SalelistSchema);
