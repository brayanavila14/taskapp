import { Router } from "express";
import { protect } from "../middleware/auth";
import { updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
