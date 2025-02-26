import ApplicationsRepository from "../repositories/applicationsRepository.js";

class ApplicationsService {
  constructor() {
    this.applicationsRepository = new ApplicationsRepository();
  }

  async getApplications() {
    try {
      return await this.applicationsRepository.getApplications();
    } catch (error) {
      const message = `Error in getApplications service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async getApplicationsById(id) {
    try {
      return await this.applicationsRepository.getApplicationsById(id);
    } catch (error) {
      const message = `Error in getApplicationsByid service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async createApplication(mission_id, volunteer_id) {
    try {
      const result = await this.applicationsRepository.createApplication(
        mission_id,
        volunteer_id
      );
      console.log(result);
    } catch (error) {
      const message = `Error in createApplication service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async updateApplicationById(status, id) {
    try {
      const updateAppplication =
        await this.applicationsRepository.updateApplicationById(status, id);
      if (updateAppplication.length === 0) {
        throw new Error("Application not found");
      }
      return "Application updated";
    } catch (error) {
      const message = `Error in updateApplicationById service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async deleteApplicationById(id) {
    try {
      const deleteApplication =
        await this.applicationsRepository.deleteApplicationById(id);
      if (!deleteApplication) {
        throw new Error("Application non trouvé");
      }
      return "Application supprimé";
    } catch (error) {
      const message = `Error in deleteApplicationById service: ${error.message}`;
      console.error(message);
      throw new error(message);
    }
  }
}

export default ApplicationsService;
