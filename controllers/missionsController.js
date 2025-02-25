import MissionsService from "../services/missionsService.js";

class MissionsController {
  constructor() {
    this.missionsService = new MissionsService();
  }

  async getMissions(req, res) {
    try {
      const missions = await this.missionsService.getMissions();
      res.status(200).json({ missions });
    } catch (error) {
      const message = `Error in getMissions controller: ${error.message}`;
      console.error(message);
      throw new Error({ error: error.message });
    }
  }

  async createMission(req, res) {
    const { title, description, mission_date, association_id } = req.body;

    try {
      const newMission = await this.missionsService.createMission(
        title,
        description,
        mission_date,
        association_id
      );
      res.status(400).json(newMission);
    } catch (error) {
      const message = `Error in createMission controller: ${error.message}`;
      console.error(message);
      throw new Error({ error: error.message });
    }
  }

  async deleteMission(req, res) {
    const { id } = req.params;
    try {
      const result = await this.missionsService.deleteMission(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
      throw new Error(error.message);
    }
  }
}

export default MissionsController;
