import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

class MissionsRepository {
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

  async getMissions() {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      return await connexion.query("SELECT * FROM missions");
    } catch (error) {
      const message = `Error in getMissions repository: ${error.message}`;
      console.error(message);
      throw new Error({ error: error.message });
    } finally {
      if (connexion) connexion.release();
    }
  }
}

export default MissionsRepository;
