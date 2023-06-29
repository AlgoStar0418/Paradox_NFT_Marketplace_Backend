const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PotSchema = new Schema({
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = Pot = mongoose.model("pots", PotSchema);
