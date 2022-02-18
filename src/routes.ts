import { Router } from "express";
import { CreateUserController } from "./contollers/CreateUserController";
import { CreateTagController } from "./contollers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./contollers/AuthenticateUserController";
import { CreateComplimentController } from "./contollers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post("/tag", ensureAdmin, createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle)
router.post("/compliments", createComplimentController.handle)

export { router}