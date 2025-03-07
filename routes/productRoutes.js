import express from "express";
import {
  addProduct,
  getFaultyProducts,
  updateProductStatus,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.put("/update-status/:productId", updateProductStatus);
router.get("/faulty", getFaultyProducts);

export default router;
