const express = require("express");
const router = express.Router();

// Pot model
const Pot = require("../models/Pot");

setInterval(() => {
  const timezone = "Europe/Paris";

  // get the current time in the GMT+1 timezone
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timezone,
  });

  const newDate = new Date(currentTime);

  if (
    newDate.getHours() === 9 &&
    newDate.getMinutes() === 0 &&
    newDate.getSeconds() === 0
  ) {
    console.log("Vote Started! Please connect smart contract");
  }
  // console.log(
  //   newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds()
  // );
}, 1000);

// @route   GET api/pots/currentTime
// @desc    Get the currentTime
// @access  Public
router.get("/currentTime", (req, res) => {
  const timezone = "Europe/Paris";

  // get the current time in the GMT+1 timezone
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timezone,
  });

  res.json({ curTime: new Date(currentTime) });
});

// @route   GET api/pots/status
// @desc    Pots starting status
// @access  Public
router.get("/status", (req, res) => {
  const timezone = "Europe/Paris";

  // get the current time in the GMT+1 timezone
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timezone,
  });

  const currentDate = new Date(currentTime);
  if (currentDate.getHours() === 9) {
    res.json({
      msg: "Please bet!",
      currentDate,
      curHour: currentDate.getHours(),
      curMinute: currentDate.getMinutes(),
      curSecond: currentDate.getSeconds(),
      status: 1,
    });
  } else {
    res.json({
      msg: "Not start! You should be wait!",
      currentDate,
      curHour: currentDate.getHours(),
      curMinute: currentDate.getMinutes(),
      curSecond: currentDate.getSeconds(),
      status: 0,
    });
  }
});

// @route   POST api/pots/create
// @desc    Create new Pot
// @access  Public
router.post("/create", (req, res) => {
  const timezone = "Europe/Paris";

  // get the current time in the GMT+1 timezone
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timezone,
  });

  const newPot = new Pot({
    created_at: new Date(currentTime),
  });

  newPot
    .save()
    .then((pot) => {
      res.json(pot);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
