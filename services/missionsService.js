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
}

export default MissionsService;
