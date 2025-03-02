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
    return await this.usersRepository.createUser(
      name,
      email,
      hashedPassword,
      user_role
    );
  }

  async login(email, password) {
    const user = await this.usersRepository.getUserByEmail(email);

    await argon2.verify(user.password, password);

    const token = jwt.sign({ id: user.id, role: user.user_role }, SECRET_KEY, {
      expiresIn: "30min",
    });
    return { token, user };
  }
}

export default AuthService;
