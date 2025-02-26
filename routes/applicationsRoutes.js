import express from "express";
import ApplicationsController from "../controllers/applicationsController.js";

const router = express.Router();
const applicationsController = new ApplicationsController();

router.get("/", (req, res) => applicationsController.getApplications(req, res));
router.get("/:id", (req, res) =>
  applicationsController.getApplicationsById(req, res)
);
router.post("/", (req, res) =>
  applicationsController.createApplication(req, res)
);
router.put("/:id", (req, res) =>
  applicationsController.updateApplicationById(req, res)
);
router.delete("/:id", (req, res) =>
  applicationsController.deleteApplicationById(req, res)
);

export default router;
