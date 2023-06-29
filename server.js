const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const pots = require("./api/pots");

const app = express();

// Set cors
app.use(
  cors({
    origin: "*",
  })
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Use Routes
app.use("/api/pots", pots);

const port = process.env.PORT || require("./config/keys").port;

app.get("/", (req, res) => {
  res.json({ msg: `Server is running on ${port} for Paradox Marketplace.` });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
