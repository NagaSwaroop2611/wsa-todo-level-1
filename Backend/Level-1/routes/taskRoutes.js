import express from "express";
import { newTask,getTasks,updateTask,deleteTask } from "../controllers/taskController.js";


const router = express.Router(); // creates a new router object.
router.post("/task",newTask);
router.get("/tasks",getTasks);
router.put("/task/:id",updateTask);
router.delete("/task/:id",deleteTask);

export default router;