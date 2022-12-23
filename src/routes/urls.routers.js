import { Router } from "express";
import { shorten } from "../controllers/urls.contollers.js";
import { authRoutesValidation } from "../middlewares/users.md.js";
import { uriValidate } from "../middlewares/urls.md.js";

const router = Router();

router.post("/urls/shorten", authRoutesValidation, uriValidate, shorten)



export default router;