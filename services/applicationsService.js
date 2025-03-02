import ApplicationsRepository from "../repositories/applicationsRepository.js";

class ApplicationsService {
  constructor() {
    this.applicationsRepository = new ApplicationsRepository();
  }

  async getApplicationsById(id) {
    return await this.applicationsRepository.getApplicationsById(id);
  }

  async createApplication(mission_id, volunteer_id) {
    return await this.applicationsRepository.createApplication(
      mission_id,
      volunteer_id
    );
  }

  async updateApplicationById(status, id) {
    return await this.applicationsRepository.updateApplicationById(status, id);
  }

  async deleteApplicationById(id) {
    return await this.applicationsRepository.deleteApplicationById(id);
  }
}
export default ApplicationsService;
