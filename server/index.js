import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import cartRouter from "./route/cart.route.js";
import orderRouter from "./route/order.route.js";
import uploadRouter from "./route/upload.router.js";
import productRouter from "./route/product.route.js";
import addressRouter from "./route/address.route.js";
import categoryRouter from "./route/category.route.js";
import subCategoryRouter from "./route/subCategory.route.js";

console.clear();
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = 8080 || process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    message: "Server is running " + PORT,
  });
});

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/file", uploadRouter);
app.use("/api/address", addressRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subCategoryRouter);

connectDB().then(() => app.listen(PORT, () => console.log("Server is running " + PORT)));
