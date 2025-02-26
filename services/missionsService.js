import MissionsRepository from "../repositories/missionsRepository.js";

class MissionsService {
  constructor() {
    this.missionsRepository = new MissionsRepository();
  }

  async getMissions() {
    try {
      return await this.missionsRepository.getMissions();
    } catch (error) {
      const message = `Error in getMissions service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async getMissionById(id) {
    try {
      return await this.missionsRepository.getMissionById(id);
    } catch (error) {
      const message = `Error in getMissionById service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async getApplicationByMissionId(id) {
    try {
      return await this.missionsRepository.getApplicationByMissionId(id);
    } catch (error) {
      const message = `Error in getApplicationByMissionId service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async createMission(title, description, mission_date, association_id) {
    try {
      return await this.missionsRepository.createMission(
        title,
        description,
        mission_date,
        association_id
      );
    } catch (error) {
      const message = `Error in createMission service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async updateMissionById(id, title, description, mission_date) {
    try {
      const updateMission = await this.missionsRepository.updateMissionById(
        id,
        title,
        description,
        mission_date
      );
      if (updateMission.length === 0) {
        throw new Error("Mission not found");
      }
      return "Mission updated";
    } catch (error) {
      const message = `Error in updateMissionById service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async deleteMissionById(id) {
    try {
      const deleteMission = await this.missionsRepository.deleteMissionById(id);
      if (!deleteMission) {
        throw new Error("Mission non trouvé");
      }
      return "Mission supprimé";
    } catch (error) {
      const message = `Error in deleteMissionById service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }
}

export default MissionsService;
