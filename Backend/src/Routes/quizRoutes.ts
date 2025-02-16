import express from 'express'
import {login} from "../Controllers/authController"
import {
  createQuizHandler,
  getQuizzesHandler,
  getQuizByIdHandler,
  updateQuizHandler,
  deleteQuizHandler,
} from "../Controllers/quizController";
const router=express.Router();

router.post('/login',login)

router.post("/create", createQuizHandler);
router.get("/get", getQuizzesHandler);
router.get("/get/:id", getQuizByIdHandler);
router.put("/update/:id", updateQuizHandler);
router.delete("/delete/:id", deleteQuizHandler);
export default router