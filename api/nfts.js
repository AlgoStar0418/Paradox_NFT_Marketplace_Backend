const express = require("express");
const router = express.Router();

// NFT Item model
const NFT = require("../models/NFT");
// Collection Model
const Collection = require("../models/Collection");
// Sale List Model
const Salelist = require("../models/Salelist");

// Validation NFT Input
const validateNFTInput = require("../validation/nft");

// @route   POST api/nfts/getCollectionByUserID
// @desc    Get collection by user id
// @access  Public
router.post("/getCollectionByUserID", (req, res) => {
  Collection.find({ user: req.body.userid })
    .then((collection) => {
      res.json(collection);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// @route   POST api/nfts/getNFTItemByUserID
// @desc    Get NFT Item by user id
// @access  Public
router.post("/getNFTItemByUserID", (req, res) => {
  NFT.find({ user: req.body.userid })
    .then((nfts) => {
      res.json(nfts);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// @route   POST api/nfts/getNFTItemByID
// @desc    Get NFT Item by id
// @access  Public
router.post("/getNFTItemByID", (req, res) => {
  NFT.findById(req.body.id)
    .populate("user")
    .populate("collections")
    .then((nfts) => {
      res.json(nfts);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// @route   POST api/nfts/getNFTItemsbyCollectionID
// @desc    Get NFT Items by collection id
// @access  Public
router.post("/getNFTItemsbyCollectionID", async (req, res) => {
  Salelist.find({ collections: req.body.collectionID })
    .populate("nft")
    .then(async (nfts) => {
      res.json(nfts);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// @route   POST api/nfts/create
// @desc    Create new NFT Item for user
// @access  Public
router.post("/create", (req, res) => {
  const { errors, isValid } = validateNFTInput(req);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newNFT = new NFT({
    user: req.body.userid,
    attach_file: req.body.logoFile,
    title: req.body.title,
    description: req.body.description,
    supply: req.body.supply,
    collections: req.body.collectionid,
    properties:
      req.body.properties.length > 0
        ? req.body.properties.map((item) => {
            return {
              type: item.type,
              name: item.name,
            };
          })
        : [],
    levels:
      req.body.levels.length > 0
        ? req.body.levels.map((item) => {
            return {
              name: item.name,
              value: Number(item.value),
            };
          })
        : [],
    stats:
      req.body.stats.length > 0
        ? req.body.stats.map((item) => {
            return {
              name: item.name,
              value: Number(item.value),
            };
          })
        : [],
  });

  newNFT
    .save()
    .then((nft) => {
      res.json(nft);
    })
    .catch((err) =>
      res.status(400).json({ flag: false, msg: "Backend API Error!" })
    );
});

module.exports = router;
