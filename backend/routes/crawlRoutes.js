const express = require("express");
const router = express.Router();
const crawlController = require("../controllers/crawlController");

router.post("/discover", crawlController.discoverProductUrls);

module.exports = router;
