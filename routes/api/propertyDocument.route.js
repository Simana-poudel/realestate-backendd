const express = require("express");
const {
  getPropertyDoc,
  postPropertyDoc,
  updatePropertyDoc,
  getPropertyDocs
} = require("../../controller/propertyDocument.controller");

const router = express.Router();

router.get('/', getPropertyDocs)
router.get("/:propertydocumentId", getPropertyDoc);
router.post("/", postPropertyDoc);
router.put("/:propertydocumentId", updatePropertyDoc);

module.exports = router;
