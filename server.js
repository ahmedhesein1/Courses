import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import courseRoutes from "./routes/courses.js";

const app = express();

// Middleware and routes setup...
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/courses", courseRoutes);
app.use(errorHandler);

// Export the Express app
export default app;
