import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent,CardDescription,CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

const CreateQuiz = () => {
  const navigate = useNavigate();

 const [title, setTitle] = useState("");
 const  [quizzes, setQuizzes] = useState([])
 const [description, setDescription] = useState("");
 const [error, setError] = useState("");

 const handleCreateQuiz = async () => {
   setError("");

   if(!title || !description){
         setError("All fields are required");


   }

   const teacherId = localStorage.getItem("teacherId");

   if (!teacherId) {
     setError("Teacher ID not found. Please log in again.");
     return;
   }

   try {
     const response = await axios.post(
       `${import.meta.env.VITE_BASE_URL}/quiz/create`,
       {
         title,
         description,
         teacherId, 
       }
     );

     const newQuiz = response.data.quiz;
     console.log("Quiz Created:", newQuiz);


     alert("Quiz created successfully!");
navigate("/dashboard");
   } catch (err) {
     setError(err.response?.data?.message || "Failed to create quiz.");
   }
 };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Quiz</CardTitle>
          <CardDescription>
            Enter the details for your new quiz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Quiz Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateQuiz} className="w-full">
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateQuiz;
