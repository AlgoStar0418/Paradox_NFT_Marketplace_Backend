const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CollectionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  logo_image: {
    type: String,
    required: true,
  },
  featured_image: {
    type: String,
  },
  banner_image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  royalty: {
    type: Number,
  },
  website: {
    type: String,
  },
  discord: {
    type: String,
  },
  instagram: {
    type: String,
  },
  medium: {
    type: String,
  },
  telegram: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Collection = mongoose.model("collections", CollectionSchema);
