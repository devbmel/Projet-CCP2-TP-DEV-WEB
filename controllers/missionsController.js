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
}

export default MissionsController;
