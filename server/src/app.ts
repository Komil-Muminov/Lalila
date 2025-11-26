import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
	res.send("Lalila API is running...");
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
	console.error(err.stack);
	res
		.status(500)
		.json({ message: "Internal Server Error", error: err.message });
});

// Start Server
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
