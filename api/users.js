const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const router = express.Router();

// User model
const User = require("../models/User");

// @route   POST api/users/sign
// @desc    Sign or Check user
// @access  Public
router.post("/sign", (req, res) => {
  User.findOne({ address: req.body.address }).then((user) => {
    if (user) {
      // User Matched
      const payload = {
        id: user.id,
        address: user.address,
        avatar: user.avatar,
        created_at: user.created_at,
      }; // Create JWT Payload

      // Sign Token
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });
    } else {
      const newUser = new User({
        address: req.body.address,
        avatar:
          Math.floor(Math.random() * 10) % 2 === 0
            ? "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOTZweCIgaGVpZ2h0PSI5NnB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9Ijg4MDc3OTE5NDA0MCI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyNTUsIDAsIDEzKSIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMTMsIDI1NSwgMCkiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSJ1cmwoIzg4MDc3OTE5NDA0MCkiIHg9IjAiIHk9IjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PC9yZWN0PgogIDwvZz4KPC9zdmc+"
            : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjgwMzc5NzA1ODA3NiI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMDgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIwOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjODAzNzk3MDU4MDc2KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
      });
      newUser
        .save()
        .then((newuser) => {
          // User Matched
          const payload = {
            id: newuser.id,
            address: newuser.address,
            avatar: newuser.avatar,
            created_at: newuser.created_at,
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        })
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
