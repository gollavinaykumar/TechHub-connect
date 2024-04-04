import { Router } from "express";
import { createCourse, getCourses } from "../Controllers/Courses";

const router = Router();
router.post("/", createCourse);
router.get("/", getCourses);

export default router;
