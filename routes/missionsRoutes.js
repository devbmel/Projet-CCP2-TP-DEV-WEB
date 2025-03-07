import express from "express";
import MissionsController from "../controllers/missionsController.js";
import { authenticateToken, checkRoles } from "../middleware/authMiddleware.js";
import { isAuthorMission } from "../middleware/isAuthorMiddleware.js";
const router = express.Router();
const missionsController = new MissionsController();

router.get("/", (req, res) => missionsController.getMissions(req, res));
router.get("/:id", (req, res) => missionsController.getMissionById(req, res));

//routes Protegées
router.post("/", authenticateToken, checkRoles("association"), (req, res) =>
  missionsController.createMission(req, res)
);
router.put(
  "/:id",
  authenticateToken,
  checkRoles("association"),
  isAuthorMission,
  (req, res) => missionsController.updateMissionById(req, res)
);
router.delete(
  "/:id",
  authenticateToken,
  checkRoles("association"),
  (req, res) => missionsController.deleteMissionById(req, res)
);
router.get(
  "/:id/applications",
  authenticateToken,
  checkRoles("association"),
  (req, res) => missionsController.getApplicationByMissionId(req, res)
);

export default router;
