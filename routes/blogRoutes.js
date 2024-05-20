import express from "express"
import { createBlog, updateBlog, deleteBlog, getAllBlogs } from "../controllers/blogController.js";

const router = express.Router();

router.post("/create", createBlog)
router.post("/update", updateBlog)
router.post("/delete", deleteBlog)
router.get("/all-blogs", getAllBlogs)

export default router;