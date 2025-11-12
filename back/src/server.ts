import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { protect } from "./middleware/sanitize";
import { generalLimiter } from "./middleware/rateLimiter";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("CORS policy: origin not allowed"));
    },
    credentials: true,
  })
);
app.use("/api", generalLimiter);
app.use(protect);

app.get("/", (_req, res) => res.send("Servidor activo 🚀"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// 🛑 Middleware de errores global
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Error capturado:", err.message);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
});

app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
