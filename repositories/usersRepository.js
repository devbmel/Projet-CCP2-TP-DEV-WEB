import mariadb from "mariadb";

class UsersRepository {
  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DB_PORT,
      connectionLimit: 5,
    });
  }

  async getUsers() {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      return await connexion.query("SELECT * FROM users");
    } catch (error) {
      const message = `Error in getUsers repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async getUserById(id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      const user = await connexion.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      console.log(user);
      return user;
    } catch (error) {
      const message = `Error in getUserById repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }
}

export default UsersRepository;
