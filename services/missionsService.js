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
      throw new Error({ error: error.message });
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
      throw new Error({ error: error.message });
    }
  }

  async deleteMission(id) {
    try {
      const deleteMission = await this.missionsRepository.deleteMission(id);
      if (!deleteMission) {
        throw new Error("Utilisteur non trouvé");
      }
      return "Utilisateur supprimé";
    } catch (error) {
      const message = `Error in deleteMission: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }
}

export default MissionsService;
