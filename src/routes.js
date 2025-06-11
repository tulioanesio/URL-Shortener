import express from "express"
import { urlShortner, redirectToOriginal } from "./controllers/urlShortnerController.js";

const router = express.Router()

router.post("/shortner", urlShortner)

router.get("/:shortCode", redirectToOriginal)

export default router