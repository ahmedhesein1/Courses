import express from "express";
import { check } from "express-validator";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.post(
  "/",
  [
    check("title", "Title is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
    check("price", "Valid price required").isFloat({ min: 0 }),
  ],
  createCourse
);

router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
