import UsersRepository from "../repositories/usersRepository.js";

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async getUsers() {
    try {
      return await this.usersRepository.getUsers();
    } catch (error) {
      const message = `Error in getusers service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }
  async getUserById(id) {
    try {
      return await this.usersRepository.getUserById(id);
    } catch (error) {
      const message = `Error in getuserById service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }
}

export default UsersService;
