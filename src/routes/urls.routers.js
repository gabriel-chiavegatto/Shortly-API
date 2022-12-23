import { Router } from "express";
import { redirectToUrl, renderShortedUrl, shorten, deleteUri } from "../controllers/urls.contollers.js";
import { authRoutesValidation } from "../middlewares/users.md.js";
import { uriValidate, userUriValidation } from "../middlewares/urls.md.js";

const router = Router();

router.post("/urls/shorten", authRoutesValidation, uriValidate, shorten);
router.get("/urls/:id", renderShortedUrl);
router.get("/urls/open/:shortUrl", redirectToUrl);
router.delete("/urls/:id", authRoutesValidation, userUriValidation, deleteUri)



export default router;