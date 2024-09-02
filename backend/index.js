import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import catergoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
// rest Object
const app = express();
import "dotenv/config";
//Config DB
connectDB();

app.use(express.json());
app.use(morgan("dev"));

// Use cors middleware
app.use(
  cors()
);

//routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/category", catergoryRoutes);

app.use("/api/v1/product", productRoutes);
// Allow preflight requests
app.options("*", cors());
//rest api
app.get("/", (req, res) => {
  res.send("hello");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`sever is running on port ${PORT}`);
});
