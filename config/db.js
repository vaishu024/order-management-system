import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/Order-Management`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process on failure
  }

  mongoose.connection.on("error", (err) => {
    console.error(" MongoDB Connection Error:", err);
  });
};

export default db;
