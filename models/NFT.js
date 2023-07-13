const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NFTSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  attach_file: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  supply: {
    type: Number,
  },
  collections: {
    type: Schema.Types.ObjectId,
    ref: "collections",
  },
  properties: [
    {
      type: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
  levels: [
    {
      name: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
  ],
  stats: [
    {
      name: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = NFT = mongoose.model("nfts", NFTSchema);
