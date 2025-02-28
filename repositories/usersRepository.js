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
      return await connexion.query("SELECT * FROM users WHERE id = ?", [id]);
    } catch (error) {
      const message = `Error in getUserById repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async getUserByEmail(email) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      const result = await connexion.query(
        "SELECT * FROM users WHERE email= ?",
        [email]
      );
      return result[0];
    } catch (error) {
      const message = `Error in getUserByEmailrepository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async createUser(name, email, hashedPassword, user_role) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      await connexion.query(
        "INSERT INTO users (name, email, password,user_role) VALUES (?,?,?,?)",
        [name, email, hashedPassword, user_role]
      );
      return {
        name,
        email,
        user_role,
      };
    } catch (error) {
      const message = `Error in createUser repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }
}

export default UsersRepository;
