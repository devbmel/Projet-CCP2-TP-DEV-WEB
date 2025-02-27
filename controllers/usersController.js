import UsersService from "../services/usersService.js";
class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  async getUsers(req, res) {
    try {
      const users = await this.usersService.getUsers();
      res.status(200).json({ users });
    } catch (error) {
      const message = `Error in getUsers controller: ${error.message}`;
      console.error(message);
      throw new Error({ error: error.message });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await this.usersService.getUserById(id);
      res.status(200).json({ user });
    } catch (error) {
      const message = `Error in getUserById controller: ${error.message}`;
      console.error(message);
      throw new Error({ error: error.message });
    }
  }
}

export default UsersController;
