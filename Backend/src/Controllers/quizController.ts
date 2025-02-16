import { Request, Response } from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../models/quizmodel";

export const createQuizHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, teacherId } = req.body;

  if (!title || !description || !teacherId) {
     res.status(400).json({ message: "All fiels are  required" });
  }

  try {
    const quiz = await createQuiz(title, description, teacherId);
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

export const getQuizzesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quizzes = await getQuizzes();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

// Get quiz by ID
        export const getQuizByIdHandler = async (
        req: Request,
        res: Response
        ): Promise<void> => {
        const { id } = req.params;
        console.log("id",id)

        // Validate input
        if (isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid quiz ID" });
            return;
        }

        try {
            const quiz = await getQuizById(Number(id));

            // If quiz is not found, send a 404 response and stop execution
            if (!quiz) {
            res.status(404).json({ message: "Quiz not found" });
            return;
            }

            // If quiz is found, send it as a response
            res.json(quiz);
        } catch (error) {
            // Log the error for debugging
            console.error("Error fetching quiz:", error);

            // Handle any errors
            res.status(500).json({ message: "Error fetching quiz", error });
        }
        };
export const updateQuizHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const affectedRows = await updateQuiz(Number(id), title, description);
    if (affectedRows === 0)
       res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
};


export const deleteQuizHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteQuiz(Number(id));
    if (affectedRows === 0)
     res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};
