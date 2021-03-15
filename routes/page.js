const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.nickName = null;
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

router.get("/join", (req, res) => {
  res.render("join", { title: "Join - Boxin" });
});

router.get("/index", (req, res) => {
  res.render("index", { title: "Index - Boxin" });
});

router.get("/", (req, res, next) => {
  res.render("index", { tile: "Boxin" });
});

module.exports = router;
