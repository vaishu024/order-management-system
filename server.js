import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./config/db.js";

//Models

import './models/Product.js';
import "./models/Manufacturer.js";
import "./models/Seller.js";
import "./models/Customer.js";
import "./models/Order.js";

//Routes

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Initialize Database
db();

// App Config
const app = express();
const port = process.env.PORT || 4002;

// Middleware
app.use(express.json());
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


// API Endpoints
app.get("/", (req, res) => {
  res.send("Order Management API is Running!");
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
