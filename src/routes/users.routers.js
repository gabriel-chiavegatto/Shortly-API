import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";
import { validateNewUser } from "../middlewares/users.md.js";

const routers = Router();

routers.post("/signUp", validateNewUser, signUp);
routers.post("/signIn", signIn);

export default routers