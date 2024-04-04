import { Router } from "express";
import { getUser } from "../Controllers/login";

const router = Router();
router.post("/", getUser);

export default router;
