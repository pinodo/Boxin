const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/available", (req, res) => {
  res.render("available", { title: "Available Slots" });
});

router.get("/location", (req, res) => {
  res.render("location", { title: "Location" });
});

router.get("/faq", (req, res) => {
  res.render("faq", { title: "FAQ" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", { title: "Join" });
});

router.get("/index", (req, res) => {
  res.render("index", { title: "Boxin" });
});

router.get("/chat", (req, res) => {
  res.render("livechat", { title: "Live Chat" });
});

router.get("/", (req, res, next) => {
  res.render("index", { title: "Boxin" });
});

module.exports = router;
