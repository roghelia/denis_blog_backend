import express from "express";
import { signUpUser, signInUser, deleteUser, updateUser } from "../controllers/userController.js";

const router = express.Router()

router.post("/sign-up", signUpUser)
router.post("/sign-in", signInUser)
router.post("/delete", deleteUser)
router.post("/update", updateUser)

export default router;