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
      insertIdAsNumber: true, // Retourne l'ID en `Number` au lieu de `BigInt`
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

  async createMission(title, description, mission_date, association_id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      const result = await connexion.query(
        "INSERT INTO missions (title, description, mission_date, association_id) VALUES (?,?,?,?)",
        [title, description, mission_date, association_id]
      );
      return {
        id: result.insertId,
        title,
        description,
        mission_date,
        association_id,
      };
    } catch (error) {
      const message = `Error in createMission repository: ${error.message}`;
      console.error(message);
      throw new Error({ error: error.message });
    } finally {
      if (connexion) connexion.release();
    }
  }

  async deleteMission(id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      await connexion.query("DELETE FROM missions WHERE id = ?", [id]);
      return "Utilisateur supprimé avec succés";
    } catch (error) {
      const message = `Error in deleteMission: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }
}

export default MissionsRepository;
