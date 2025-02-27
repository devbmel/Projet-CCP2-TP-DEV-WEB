import express from "express";
import UsersController from "../controllers/usersController.js";

const router = express.Router();
const usersController = new UsersController();

router.get("/", (req, res) => usersController.getUsers(req, res));
router.get("/:id", (req, res) => usersController.getUserById(req, res));
export default router;
