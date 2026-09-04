import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import deliveryPartnerRouter from "./routes/deliveryPartnerRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req: Request, res: Response) => {
    res.send("Server is Live!");
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/admin", adminRouter);
app.use("/api/delivery", deliveryPartnerRouter);

// Inngest
app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions,
    })
);

// Error handler
app.use(
    (error: any, req: Request, res: Response, next: NextFunction) => {
        console.error(error);

        res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
