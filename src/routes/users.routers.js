import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";
import { validateNewUser, validateUserLogin } from "../middlewares/users.md.js";

const routers = Router();

routers.post("/signUp", validateNewUser, signUp);
routers.post("/signIn", validateUserLogin, signIn);

export default routers