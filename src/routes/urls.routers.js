import { Router } from "express";
import { renderShortedUrl, shorten } from "../controllers/urls.contollers.js";
import { authRoutesValidation } from "../middlewares/users.md.js";
import { uriValidate } from "../middlewares/urls.md.js";

const router = Router();

router.post("/urls/shorten", authRoutesValidation, uriValidate, shorten);
router.get("/urls/:id", renderShortedUrl);



export default router;