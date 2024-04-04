import { Router } from "express";
import { getCourse } from "../Controllers/Course";

const router = Router();

router.post("/", getCourse);

export default router;
