import express from "express";
import MissionsController from "../controllers/missionsController.js";

const router = express.Router();
const missionsController = new MissionsController();

router.get("/", (req, res) => missionsController.getMissions(req, res));
router.get("/:id", (req, res) => missionsController.getMissionById(req, res));

router.post("/", (req, res) => missionsController.createMission(req, res));
router.delete("/:id", (req, res) =>
  missionsController.deleteMissionById(req, res)
);
router.put("/:id", (req, res) =>
  missionsController.updateMissionById(req, res)
);

export default router;
