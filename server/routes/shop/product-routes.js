const express = require("express");

const {
  getFilteredProducts,
} = require("../../controllers/shop/product-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.get("/fetch-products", getFilteredProducts);

module.exports = router;
