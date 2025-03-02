import express from "express";
import ApplicationsController from "../controllers/applicationsController.js";
import { checkRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const applicationsController = new ApplicationsController();

router.get("/:id", (req, res) =>
  applicationsController.getApplicationsById(req, res)
);
router.post("/", checkRoles("volunteer"), (req, res) =>
  applicationsController.createApplication(req, res)
);
router.put("/:id", checkRoles("association"), (req, res) =>
  applicationsController.updateApplicationById(req, res)
);
router.delete("/:id", checkRoles("volunteer"), (req, res) =>
  applicationsController.deleteApplicationById(req, res)
);

export default router;
