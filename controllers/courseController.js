import Course from "../models/Course.js";
import { validationResult } from "express-validator";

export const getCourses = async (req, res) => {
  const courses = await Course.find().sort("-createdAt");
  res.json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) throw new Error("Course not found");
  res.json(course);
};

export const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const course = await Course.create(req.body);
  res.status(201).json(course);
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) throw new Error("Course not found");
  res.json(course);
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) throw new Error("Course not found");
  res.json({ msg: "Course removed" });
};
