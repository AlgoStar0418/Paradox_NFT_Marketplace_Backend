const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BidSchema = new Schema({
  salelist: {
    type: Schema.Types.ObjectId,
    ref: "salelists",
  },
  biduser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  bidamount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Bid = mongoose.model("bids", BidSchema);
