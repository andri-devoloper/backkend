const express = require("express");
const router = express.Router();

const {
  getProduct,
  getProductById,
  CreateProduct,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

router.get("/product", getProduct);
router.get("/product/:id", getProductById);
router.post("/product", CreateProduct);
router.put("/product/:id", UpdateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
