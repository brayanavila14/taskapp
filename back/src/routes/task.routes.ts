import { Router } from "express";
import { body } from "express-validator";
import { protect } from "../middleware/auth";
import { runValidation } from "../middleware/validate";
import {
  createTask,
  listTask,
  completedTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

router.post(
  "/",
  protect,
  [body("description").isString().notEmpty()],
  runValidation,
  createTask
);
router.get("/", protect, listTask);
router.patch("/:id", protect, completedTask);
router.delete("/:id", protect, deleteTask);

export default router;
