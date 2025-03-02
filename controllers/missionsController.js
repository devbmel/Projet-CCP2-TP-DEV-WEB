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
      res.status(500).json({ error: "INternal server error" });
    }
  }

  async getMissionById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID required" });
    }
    try {
      const missionById = await this.missionsService.getMissionById(id);
      if (!missionById || missionById.length === 0) {
        return res.status(404).json({ error: "MIssion not found" });
      }
      res.status(200).json({ missionById });
    } catch (error) {
      const message = `Error un getMissionById controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getApplicationByMissionId(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Id required" });
    }
    try {
      const mission = await this.missionsService.getMissionById(id);
      if (!mission || mission.length === 0) {
        return res.status(404).json({ error: "mission not found" });
      }
      const applications = await this.missionsService.getApplicationByMissionId(
        id
      );

      res.status(200).json({ applications });
    } catch (error) {
      const message = `Error in getApplicationByMissionId controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async createMission(req, res) {
    const { title, description, mission_date, association_id } = req.body;
    if (!title || !description || !mission_date || !association_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      await this.missionsService.createMission(
        title,
        description,
        mission_date,
        association_id
      );
      res.status(201).json("Mission created with success");
    } catch (error) {
      const message = `Error in createMission controller: ${error.message}`;
      console.error(message);

      res.status(500).json({ error: "INternal server error" });
    }
  }

  async updateMissionById(req, res) {
    const { id } = req.params;
    const { title, description, mission_date } = req.body;

    if (!id || !title || !description || !mission_date) {
      return res.status(400).json({ error: " missing one required field" });
    }
    try {
      const missionUpdated = await this.missionsService.updateMissionById(
        id,
        title,
        description,
        mission_date
      );
      if (!missionUpdated || missionUpdated.length === 0) {
        return res.status(404).json({ error: "mission not found" });
      }

      res.status(200).send("MIsssion updated");
    } catch (error) {
      const message = `Error in updateMissionById controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteMissionById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id required" });
    }

    try {
      const missionDeleted = await this.missionsService.deleteMissionById(id);
      if (!missionDeleted || missionDeleted.affectedRows === 0) {
        return res.status(404).json({ message: "Mission not found" });
      }
      res.status(200).json({ message: "Mission deleted with success" });
    } catch (error) {
      const message = `Error in updateMissionById controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default MissionsController;
