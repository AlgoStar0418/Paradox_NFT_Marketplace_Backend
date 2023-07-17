const express = require("express");
const router = express.Router();

// Collection model
const Collection = require("../models/Collection");
// Salelist model
const Salelist = require("../models/Salelist");

// Validation Collection Input
const validateCollectionInput = require("../validation/collection");

// @route   GET api/collections/all
// @desc    Get all collection for NFTs
// @access  Public
router.get("/all", (req, res) => {
  Salelist.find()
    .populate([
      {
        path: "nft",
        populate: {
          path: "collections",
        },
      },
    ])
    .then((salelists) => {
      res.json(salelists);
    })
    .catch((err) => {
      return res.status(400).json({ flag: false, msg: "Backend API Error!" });
    });
});

// @route   POST api/collections/create
// @desc    Create new collection for NFTs
// @access  Public
router.post("/create", (req, res) => {
  const { errors, isValid } = validateCollectionInput(req);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newCollection = new Collection({
    user: req.body.userid,
    logo_image: req.body.logoImg,
    featured_image: req.body.featuredImg,
    banner_image: req.body.bannerImg,
    title: req.body.title,
    symbol: req.body.symbol,
    description: req.body.description,
    category: req.body.category,
    royalty: req.body.royalty,
    website: req.body.website,
    discord: req.body.discord,
    instagram: req.body.instagram,
    medium: req.body.medium,
    telegram: req.body.telegram,
  });

  newCollection
    .save()
    .then((collection) => {
      res.json(collection);
    })
    .catch((err) =>
      res.status(400).json({ flag: false, msg: "Backend API Error!" })
    );
});

module.exports = router;
