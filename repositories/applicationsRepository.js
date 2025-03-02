import mariadb from "mariadb";

class ApplicationsRepository {
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

  async getApplicationsById(id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      return await connexion.query("SELECT * FROM applications WHERE id = ?", [
        id,
      ]);
    } catch (error) {
      const message = `Error in getApplicationById repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async createApplication(mission_id, volunteer_id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      await connexion.query(
        "INSERT INTO applications (mission_id, volunteer_id) VALUES (?,?)",
        [mission_id, volunteer_id]
      );

      return { mission_id, volunteer_id };
    } catch (error) {
      const message = `Error in createApplication repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async updateApplicationById(status, id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      await connexion.query("UPDATE applications SET status= ? WHERE id = ?", [
        status,
        id,
      ]);
      return await this.getApplicationsById(id);
    } catch (error) {
      const message = `Error in updateApplicationById repository: ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }

  async deleteApplicationById(id) {
    let connexion;
    try {
      connexion = await this.pool.getConnection();
      return await connexion.query("DELETE FROM applications WHERE id = ?", [
        id,
      ]);
    } catch (error) {
      const message = `Error in deleteApplicationById! ${error.message}`;
      console.error(message);
      throw new Error(message);
    } finally {
      if (connexion) connexion.release();
    }
  }
}

export default ApplicationsRepository;
