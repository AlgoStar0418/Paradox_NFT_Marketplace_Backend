const express = require("express");
const router = express.Router();

// Sale List Model
const Salelist = require("../models/Salelist");

// @route   POST api/salelists/getItemByNFTID
// @desc    Get sale list item by NFT id
// @access  Public
router.post("/getItemByNFTID", (req, res) => {
  Salelist.find({ nft: req.body.nftid })
    .populate("nft")
    .then((salelists) => {
      res.json({ salelists, currentDate: new Date() });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// @route   POST api/salelists/getItemByUserID
// @desc    Get sale list item by user id
// @access  Public
router.post("/getItemByUserID", (req, res) => {
  Salelist.find({ user: req.body.userid })
    .populate("nft")
    .then((salelists) => {
      res.json({ salelists, currentDate: new Date() });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// @route   POST api/salelists/addsalelistitem
// @desc    Add new list for sale
// @access  Public
router.post("/addsalelistitem", (req, res) => {
  Salelist.find({ nft: req.body.nftid })
    .then((salelists) => {
      if (!salelists) {
        return res
          .status(400)
          .json({ flag: false, msg: "You already listed this item!" });
      } else {
        var today = new Date();
        if (req.body.duration === "1hours") {
          today.setHours(today.getHours() + 1);
        } else if (req.body.duration === "6hours") {
          today.setHours(today.getHours() + 6);
        } else if (req.body.duration === "1days") {
          today.setDate(today.getDate() + 1);
        } else if (req.body.duration === "3days") {
          today.setDate(today.getDate() + 3);
        } else if (req.body.duration === "7days") {
          today.setDate(today.getDate() + 7);
        } else if (req.body.duration === "1months") {
          today.setMonth(today.getMonth() + 1);
        } else if (req.body.duration === "3months") {
          today.setMonth(today.getMonth() + 3);
        } else if (req.body.duration === "6months") {
          today.setMonth(today.getMonth() + 6);
        }

        const newSaleList = new Salelist({
          sale_type: req.body.sale_type,
          price: req.body.price,
          duration: req.body.duration,
          nft: req.body.nftid,
          collections: req.body.collectionid,
          user: req.body.userid,
          starting_time: new Date(),
          expired_time: req.body.sale_type === 1 ? new Date() : today,
        });

        newSaleList
          .save()
          .then((salelist) => {
            res.json(salelist);
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
