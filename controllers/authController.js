import AuthService from "../services/authService.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async register(req, res) {
    const { name, email, password, user_role } = req.body;
    try {
      await this.authService.register(name, email, password, user_role);
      res.status(201).json("User created with success");
    } catch (error) {
      const message = `Error in createUsercontroller: ${error.message}`;
      console.error(message);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const { token, user } = await this.authService.login(email, password);
      console.log(token, user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env === "dev",
        sameSite: "Strict",
        expires: new Date(Date.now() + 3600000),
      });
      const userSend = {
        name: user.name,
        email: user.email,
        role: user.user_role,
      };
      res.status(200).json({ message: "User connected", userSend });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

export default AuthController;
