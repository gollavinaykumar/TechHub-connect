import { Router } from "express";
import { userProfile } from "../Controllers/userProfile";

const router = Router();
router.patch("/", userProfile);
export default router;
