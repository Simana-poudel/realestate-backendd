const express = require("express");
const {
  getProperties,
  getProperty,
  postProperty,
  updateProperty,
  deleteProperty
} = require("../../controller/property.controller");

const router = express.Router();

router.get("/", getProperties);
router.get("/:propertyId", getProperty);

router.post("/", postProperty);
router.put("/:propertyId", updateProperty);

router.delete("/:propertyId", deleteProperty);

module.exports = router;
