const express = require("express");

const {
  addFeatureImageController,
  getFeatureImageController,
} = require("../../controllers/common/Feature-controller");

const router = express.Router();

router.get("/get", getFeatureImageController);
router.post("/add", addFeatureImageController);

module.exports = router;
