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
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id required" });
    }
    try {
      const user = await this.usersService.getUserById(id);
      if (!user || user.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      const message = `Error in getUserById controller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UsersController;
