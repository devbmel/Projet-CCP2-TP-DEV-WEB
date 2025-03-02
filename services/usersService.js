import UsersRepository from "../repositories/usersRepository.js";
import argon2 from "argon2";
class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async getUsers() {
    return await this.usersRepository.getUsers();
  }
  async getUserById(id) {
    return await this.usersRepository.getUserById(id);
  }
}

export default UsersService;
