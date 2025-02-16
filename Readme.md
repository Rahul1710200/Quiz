📌 Project Overview

Quizo is a quiz management system that allows teachers to create, update, and manage quizzes. This project includes both frontend and backend implementation using TypeScript, MySQL, and MVC   architecture.

🛠️ Tech Stack

Frontend: React, Tailwind CSS, React Router

Backend: Node.js, Express.js, MySQL


🔑 User   Credentials

The system has three predefined users for testing:You can use any of these to login


id | username | password |

+----+----------+----------+

|  1 | teacher  | password |

|  2 | teacher2 | password |

|  3 | teacher3 | password




Frontend Routes :

1-   /dashboard
2-   /create-quiz
3-   /quiz/:id


🚀Backend API Endpoints

The backend provides several routes to manage quizzes   and authentication.

🔹 Authentication Routes

Method

Endpoint

Description

POST  /user/login

POST  /quiz/creat    Creates a new quiz.

GET   /quiz/get     Retrieves all quizzes.

GET   /quiz/get/:id   Retrieves  quiz by its ID.

PUT  /quiz/update/:id  Updates an existing quiz.

DELETE  /quiz/delete/:id    Deletes a quiz.

For Backend env
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME



For Frontend env
VITE_BASE_URL=http://localhost:3000



Installation & Setup

1️⃣ Clone the repository

Step-1 git clone https://github.com/Rahul1710200/Quiz.git

Step-2 cd Assignment

Step-3 cd Backend

Step-4 npm run dev

Step-5  cd Frontend

Step-6 npm run dev

!! And you can see Login credentials are listed above 

