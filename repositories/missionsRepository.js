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
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async getMissionById(id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      return await connexion.query("SELECT * FROM missions WHERE id = ?", [id]);
    } catch (error) {
      const message = `Error in getMissionById repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async getApplicationByMissionId(id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      return await connexion.query(
        "SELECT title, description, mission_date, association_id, status, volunteer_id FROM missions INNER JOIN applications ON missions.id = applications.mission_id WHERE missions.id = ? and status = 'pending'",
        [id]
      );
    } catch (error) {
      const message = `Error in getApplicationByMissionId repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async createMission(title, description, mission_date, association_id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      await connexion.query(
        "INSERT INTO missions (title, description, mission_date, association_id) VALUES (?,?,?,?)",
        [title, description, mission_date, association_id]
      );
      return {
        title,
        description,
        mission_date,
        association_id,
      };
    } catch (error) {
      const message = `Error in createMission repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async updateMissionById(id, title, description, mission_date) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      await connexion.query(
        "UPDATE missions SET title = ?, description = ?, mission_date= ? WHERE id = ?",
        [title, description, mission_date, id]
      );
      return await this.getMissionById(id);
    } catch (error) {
      const message = `Error in updateMissionById repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async deleteMissionById(id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      return await connexion.query("DELETE FROM missions WHERE id = ?", [id]);
    } catch (error) {
      const message = `Error in deleteMissionById: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }
}

export default MissionsRepository;
