const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/chat", (req, res) => {
  res.render("chat", { title: "Chatting Room" });
});

router.get("/", (req, res) => {
  res.render("chat", { title: "Live Chat" });
});

module.exports = router;
