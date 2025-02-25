import express from "express";
import MissionsController from "../controllers/missionsController.js";

const router = express.Router();
const missionsController = new MissionsController();

router.get("/", (req, res) => missionsController.getMissions(req, res));

export default router;
