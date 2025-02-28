import UsersRepository from "../repositories/usersRepository.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

class AuthService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async register(name, email, password, user_role) {
    const hashedPassword = await argon2.hash(password);
    try {
      return await this.usersRepository.createUser(
        name,
        email,
        hashedPassword,
        user_role
      );
    } catch (error) {
      const message = `Error in createUser service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }

  async login(email, password) {
    try {
      const user = await this.usersRepository.getUserByEmail(email);
      if (!user) throw new Error("User not found");

      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) throw new Error("Password incorrect");

      const token = jwt.sign(
        { id: user.id, role: user.user_role },
        SECRET_KEY,
        { expiresIn: "30min" }
      );
      return { token, user };
    } catch (error) {
      const message = `Error in login service: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
  }
}

export default AuthService;
