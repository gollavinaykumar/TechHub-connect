import { Router } from "express";
import {
  deleteQuestion,
  getAllQuestions,
  getCourse,
} from "../Controllers/SingleCourse";
import { createQuestion } from "../Controllers/CourseQuestion";

const router = Router();
router.put("/", getCourse);
router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.delete("/", deleteQuestion);

export default router;
