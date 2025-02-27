import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json" with { type: "json"};
import missionsRoutes from "./routes/missionsRoutes.js";
import applicationsRoutes from "./routes/applicationsRoutes.js";

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/missions", missionsRoutes);

app.use("/applications", applicationsRoutes);

app.listen(SERVER_PORT, () => {
  console.info(`Server is running ${SERVER_PORT}`);
});
