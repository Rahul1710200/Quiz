import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState() 
  const [updatedTitle, setUpdatedTitle] = useState(""); 
  const [updatedDescription, setUpdatedDescription] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const teacherId = localStorage.getItem("teacherId"); 
      if (!teacherId) {
        console.error("Teacher ID not found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/quiz/get/${teacherId}`
        );
        console.log("Response:", response.data);
        setQuizzes(response.data);
      } catch (err) {
        console.error(
          "Error fetching quizzes:",
          err.response?.data?.message || err
        );
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/quiz/delete/${quizId}`
      );

      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== quizId)
      );

      console.log("Quiz deleted successfully");
    } catch (err) {
      console.error("Error deleting quiz:", err.response?.data?.message || err);
    }
  };

  const handleEditQuiz = (
    quizId,
    title,
    description
  ) => {
    setEditingQuizId(quizId);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  const handleSaveQuiz = async (quizId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/quiz/update/${quizId}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        }
      );

      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === quizId
            ? { ...quiz, title: updatedTitle, description: updatedDescription }
            : quiz
        )
      );

      setEditingQuizId(null);
      setUpdatedTitle("");
      setUpdatedDescription("");

      console.log("Quiz updated successfully");
    } catch (err) {
      console.error("Error updating quiz:", err.response?.data?.message || err);
    }
  };

  const handleCancelEdit = () => {
    setEditingQuizId(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => navigate("/create-quiz")}>Create Quiz</Button>
      </div>
      <div className="space-y-4">
        {quizzes.length === 0 ? (
          <p className="text-gray-500 text-center">No quizzes available.</p>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <Card key={index}>
                <CardHeader>
                  {editingQuizId === quiz.id ? (
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => {
                        setUpdatedTitle(e.target.value);
                      }}
                      className="text-2xl border-2 border-black  font-bold"
                    />
                  ) : (
                    <CardTitle>{quiz.title}</CardTitle>
                  )}
                </CardHeader>
                <CardContent>
                  {editingQuizId === quiz.id ? (
                    <input
                      type="text"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                      className="text-gray-600 border-2 border-black"
                    />
                  ) : (
                    <p className="text-gray-600">{quiz.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Created at: {new Date(quiz.created_at).toLocaleString()}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    {editingQuizId === quiz.id ? (
                      <>
                        <Button onClick={() => handleSaveQuiz(quiz.id)}>
                          OK
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() =>
                            handleEditQuiz(
                              quiz.id,
                              quiz.title,
                              quiz.description
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteQuiz(quiz.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
