import AuthService from "../services/authService.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async register(req, res) {
    const { name, email, password, user_role } = req.body;
    if (!name || !email || !password || !user_role) {
      return res.status(400).json({ error: "missing required field" });
    }
    try {
      await this.authService.register(name, email, password, user_role);
      res.status(201).json("User created with success");
    } catch (error) {
      const message = `Error in authcontroller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Password and Email required" });
    }
    try {
      const { token, user } = await this.authService.login(email, password);

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
      const message = `Error in authcontroller: ${error.message}`;
      console.error(message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default AuthController;
