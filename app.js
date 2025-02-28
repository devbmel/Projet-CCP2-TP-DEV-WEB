import express from "express";
import dotenv from "dotenv";
dotenv.config();

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json" with { type: "json"};

import cookieParser from "cookie-parser";

import missionsRoutes from "./routes/missionsRoutes.js";
import applicationsRoutes from "./routes/applicationsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { authenticateToken } from "./middleware/authMiddleware.js";

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();


app.use(express.json());
app.use(cookieParser())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));




app.use("/auth", authRoutes)
app.use("/missions", missionsRoutes);
app.use("/applications", authenticateToken, applicationsRoutes);
app.use("/users", authenticateToken, usersRoutes )

app.listen(SERVER_PORT, () => {
  console.info(`Server is running ${SERVER_PORT}`);
});
