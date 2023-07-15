const express = require("express");
const {
  getOfferProperty,
  postOfferProperty
} = require("../../controller/offerproperty.controller");

const router = express.Router();

router.get("/:offerpropertyId", getOfferProperty);

router.post("/", postOfferProperty);

module.exports = router;
