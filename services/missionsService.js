import MissionsRepository from "../repositories/missionsRepository.js";

class MissionsService {
  constructor() {
    this.missionsRepository = new MissionsRepository();
  }

  async getMissions() {
    return await this.missionsRepository.getMissions();
  }

  async getMissionById(id) {
    return await this.missionsRepository.getMissionById(id);
  }

  async getApplicationByMissionId(id) {
    return await this.missionsRepository.getApplicationByMissionId(id);
  }

  async createMission(title, description, mission_date, association_id) {
    return await this.missionsRepository.createMission(
      title,
      description,
      mission_date,
      association_id
    );
  }

  async updateMissionById(id, title, description, mission_date) {
    return await this.missionsRepository.updateMissionById(
      id,
      title,
      description,
      mission_date
    );
  }

  async deleteMissionById(id) {
    return await this.missionsRepository.deleteMissionById(id);
  }
}

export default MissionsService;
