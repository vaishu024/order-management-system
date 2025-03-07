import express from "express";
import {
  createOrder,
  getAllOrders,
  getMonthlyRevenue,
  getMostOrderedProducts,
} from '../controllers/orderController.js';

const router = express.Router();

router.post("/create", createOrder);
// console.log("Request Body:", req.body);
router.get("/all-orders",getAllOrders);
router.get("/most-ordered", getMostOrderedProducts);
router.get("/monthly-revenue", getMonthlyRevenue);

export default router;
