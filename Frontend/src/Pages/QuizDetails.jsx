import { useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const QuizDetails = () => {
  const location = useLocation(); 
  const quiz = location.state?.quiz; 

  if (!quiz) {
    return <div>Quiz not found!</div>; 
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quiz.questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">{question.text}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {question.answers.map((answer, index) => (
                    <li key={index} className="text-gray-700">
                      {answer}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-green-600">
                  Correct Answer: {question.correctAnswer}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDetails;
