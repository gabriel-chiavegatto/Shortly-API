import { Router } from "express";
import { signIn, signUp, userLinks } from "../controllers/users.controllers.js";
import { authRoutesValidation, validateNewUser, validateUserLogin } from "../middlewares/users.md.js";

const routers = Router();

routers.post("/signUp", validateNewUser, signUp);
routers.post("/signIn", validateUserLogin, signIn);
routers.get("/users/me", authRoutesValidation, userLinks)

export default routers