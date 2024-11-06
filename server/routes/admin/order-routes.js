const express = require("express");

const {
  getAllOrderOfAllUsers,
  getOrderDetailsForAdmin,
  updateAdminOrderController,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrderOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateAdminOrderController);

module.exports = router;
