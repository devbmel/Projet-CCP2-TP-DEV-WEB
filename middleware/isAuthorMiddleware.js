import MissionsService from "../services/missionsService.js";
import ApplicationsService from "../services/applicationsService.js";

const missionsService = new MissionsService();
const applicationsService = new ApplicationsService();

export async function isAuthorMission(req, res, next) {
  const mission = await missionsService.getMissionById(req.params.id);
  if (!mission) {
    return res.status(400).json({ message: "mission not found" });
  }
  console.log(req.user.id);
  console.log(mission.association_id);
  if (mission.association_id !== req.user.id) {
    return res.status(403).json({
      message: "Only the association that posted this mission can modify it.",
    });
  }
  next();
}

export async function isAuthorApplication(req, res, next) {
  const application = await applicationsService.getApplicationsById(
    req.params.id
  );
  if (!application) {
    return res.status(400).json({ message: "application not found" });
  }
  if (application.volunteer_id != req.user.id) {
    return res.status(403).json({
      message: "Only the volunteer that post this application can modify it",
    });
  }
  next();
}
