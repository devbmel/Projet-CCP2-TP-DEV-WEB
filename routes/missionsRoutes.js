import express from "express";
import MissionsController from "../controllers/missionsController.js";
import { authenticateToken, checkRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const missionsController = new MissionsController();

router.get("/", (req, res) => missionsController.getMissions(req, res));
router.get("/:id", (req, res) => missionsController.getMissionById(req, res));

//routes Protegées
router.post("/", authenticateToken, checkRoles("asssociation"), (req, res) =>
  missionsController.createMission(req, res)
);
router.put("/:id", authenticateToken, (req, res) =>
  missionsController.updateMissionById(req, res)
);

router.delete("/:id", authenticateToken, (req, res) =>
  missionsController.deleteMissionById(req, res)
);
router.get("/:id/applications", authenticateToken, (req, res) =>
  missionsController.getApplicationByMissionId(req, res)
);

export default router;
