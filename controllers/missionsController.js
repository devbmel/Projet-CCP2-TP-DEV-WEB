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

  async getMissionById(req, res) {
    const { id } = req.params;
    try {
      const missionById = await this.missionsService.getMissionById(id);
      res.status(200).json({ missionById });
    } catch (error) {
      const message = `Error un getMissionById controller: ${error.message}`;
      console.error(message);
      throw new Error(message);
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
      res.status(200).json(newMission);
    } catch (error) {
      const message = `Error in createMission controller: ${error.message}`;
      console.error(message);
      throw new Error({ error: error.message });
    }
  }

  async deleteMissionById(req, res) {
    const { id } = req.params;
    try {
      const result = await this.missionsService.deleteMissionById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
      throw new Error(error.message);
    }
  }
}

export default MissionsController;
