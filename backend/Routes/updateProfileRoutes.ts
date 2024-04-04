import { Router } from "express";
import { updateProfile, updateProfilePic } from "../Controllers/updateProfile";

const router = Router();
router.post("/", updateProfile);
router.patch("/", updateProfilePic);

export default router;
