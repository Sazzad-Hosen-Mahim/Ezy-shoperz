const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/product-controller");

const router = express.Router();

router.get("/fetch-products", getFilteredProducts);
router.get("/fetch-products/:id", getProductDetails);

module.exports = router;
