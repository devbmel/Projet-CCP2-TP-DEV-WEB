import ApplicationsService from "../services/applicationsService.js";

class ApplicationsController {
  constructor() {
    this.applicationService = new ApplicationsService();
  }

  async getApplicationsById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id required" });
    }
    try {
      const applicationById = await this.applicationService.getApplicationsById(
        id
      );
      if (!applicationById) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.status(200).json({ applicationById });
    } catch (error) {
      const message = `Error in getApplicationsById controller : ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createApplication(req, res) {
    const { mission_id, volunteer_id } = req.body;
    if (!mission_id || !volunteer_id) {
      return res
        .status(400)
        .json({ error: "volunteer_id and mission_id required" });
    }
    try {
      const newApplication = await this.applicationService.createApplication(
        mission_id,
        volunteer_id
      );
      res.status(201).json(newApplication);
    } catch (error) {
      const message = `Error in createApplication controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateApplicationById(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ error: "id and status required" });
    }
    try {
      const applicationUpdated =
        await this.applicationService.updateApplicationById(status, id);
      if (!applicationUpdated || applicationUpdated.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      res.status(200).json({ message: "Status of this application updated" });
    } catch (error) {
      const message = `Error in updateApplicationsById controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error " });
    }
  }

  async deleteApplicationById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id required" });
    }

    try {
      const applicationDeleted =
        await this.applicationService.deleteApplicationById(id);
      if (!applicationDeleted || applicationDeleted.affectedRows === 0) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.status(200).json({ message: "Application deleted with success" });
    } catch (error) {
      const message = `Error in deleteApplicationById controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ApplicationsController;
