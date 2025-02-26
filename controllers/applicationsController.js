import ApplicationsService from "../services/applicationsService.js";

class ApplicationsController {
  constructor() {
    this.applicationService = new ApplicationsService();
  }

  async getApplications(req, res) {
    try {
      const applications = await this.applicationService.getApplications();
      res.status(200).json({ applications });
    } catch (error) {
      const message = `Error in getApplications controller: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }
  async createApplication(req, res) {
    const { mission_id, volunteer_id } = req.body;
    try {
      const newApplication = await this.applicationService.createApplication(
        mission_id,
        volunteer_id
      );
      res.status(200).json(newApplication);
    } catch (error) {
      const message = `Error in createApplication controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: error.message });
      throw new Error(message);
    }
  }

  async deleteApplicationById(req, res) {
    const { id } = req.params;
    try {
      const result = await this.applicationService.deleteApplicationById(id);
      res.status(200).json(result);
    } catch (error) {
      const message = `Error in deleteApplicationById controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: error.message });
      throw new Error(error.message);
    }
  }
}

export default ApplicationsController;
