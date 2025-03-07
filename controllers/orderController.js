import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create Order API
export const createOrder = async (req, res) => {
  try {
    const { product, customer, seller, manufacturer, quantity, totalPrice } = req.body;

    const order = new Order({
      product,
      customer,
      seller,
      manufacturer,
      quantity,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get All Orders API with Details

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
  
        {
          $lookup: {
            from: "manufacturers",
            localField: "manufacturer",
            foreignField: "_id",
            as: "manufacturerDetails",
          },
        },
        { $unwind: { path: "$manufacturerDetails", preserveNullAndEmptyArrays: true } },
  
        {
          $lookup: {
            from: "sellers",
            localField: "seller",
            foreignField: "_id",
            as: "sellerDetails",
          },
        },
        { $unwind: { path: "$sellerDetails", preserveNullAndEmptyArrays: true } },
  
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customerDetails",
          },
        },
        { $unwind: { path: "$customerDetails", preserveNullAndEmptyArrays: true } },
  
        {
          $project: {
            _id: 1,
            product: "$productDetails.name",
            manufacturer: "$manufacturerDetails.name",
            seller: "$sellerDetails.name",
            customer: "$customerDetails.name",
            quantity: 1,
            totalPrice: 1,
            orderDate: 1,
          },
        },
      ]);
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
// Get Most Ordered Products API
export const getMostOrderedProducts = async (req, res) => {
  try {
    const mostOrderedProducts = await Order.aggregate([
        {
          $group: {
            _id: "$product",
            totalOrders: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        { $unwind: "$productDetails" },
        { $sort: { totalOrders: -1 } }, // Sort in descending order
        {
          $project: {
            _id: 0,
            productId: "$_id",
            productName: "$productDetails.name",
            totalOrders: 1
          }
        }
      ]);
  
      res.status(200).json(mostOrderedProducts);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Monthly Revenue API
export const getMonthlyRevenue = async (req, res) => {
    try {
        const results = await Order.aggregate([
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m", date: "$orderDate" } }, 
              totalOrders: { $sum: 1 }, 
              totalRevenue: { $sum: "$totalPrice" } 
            }
          },
          { $sort: { _id: -1 } } 
        ]);
    
        res.status(200).json({ success: true, data: results });
      } catch (error) {
        console.error("Error fetching orders & revenue:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error });
      }
};
