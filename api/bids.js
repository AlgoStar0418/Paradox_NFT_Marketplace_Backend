const express = require("express");
const { populate } = require("../models/Bid");
const router = express.Router();

// Bid model
const Bid = require("../models/Bid");
// User model
const User = require("../models/User");

// @route   POST api/bids/getBidsBySaleListID
// @desc    Get bids by salelist id
// @access  Public
router.post("/getBidsBySaleListID", (req, res) => {
  Bid.find({ salelist: req.body.salelistid })
    .populate("biduser")
    .then((bids) => {
      res.json(bids);
    })
    .catch((err) => {
      return res.status(400).json({ flag: false, msg: "Backend API Error!" });
    });
});

// @route   POST api/bids/getBidsByUserID
// @desc    Get the bid items by user id
// @access  Public
router.post("/getBidsByUserID", (req, res) => {
  Bid.find({ biduser: req.body.userid })
    .populate([
      {
        path: "salelist",
        populate: {
          path: "nft",
        },
      },
    ])
    .then((bids) => {
      res.json(bids);
    })
    .catch((err) => {
      return res.status(400).json({ flag: false, msg: "Backend API Error!" });
    });
});

// @route   POST api/bids/getExistBidsBySaleListAndUserID
// @desc    Get the existing bids by salelist id and user id
// @access  Public
router.post("/getExistBidsBySaleListAndUserID", (req, res) => {
  Bid.findOne({ salelist: req.body.salelistid, biduser: req.body.userid })
    .then((bids) => {
      res.json(bids);
    })
    .catch((err) => {
      return res.status(400).json({ flag: false, msg: "Backend API Error!" });
    });
});

// @route   POST api/bids/bid
// @desc    Bid with user id and salelist id
// @access  Public
router.post("/bid", (req, res) => {
  User.findOne({ _id: req.body.biduserid })
    .then((user) => {
      if (user) {
        const newBid = new Bid({
          salelist: req.body.salelistid,
          biduser: req.body.biduserid,
          bidamount: req.body.bidamount,
        });

        newBid
          .save()
          .then((bid) => {
            res.json(bid);
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ flag: false, msg: "Backend API Error!" });
          });
      } else {
        return res
          .status(400)
          .json({ flag: false, msg: "Current User is not Exist!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ flag: false, msg: "Backend API Error!" });
    });
});

module.exports = router;
