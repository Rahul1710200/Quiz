import express from "express"
import cors from 'cors'
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectToDatabase } from "./Utils/database";
import authRoutes from "./Routes/authRoutes";
import quizModel from "./Routes/quizRoutes"

const app=express()
app.use(cors());
app.use(bodyParser.json());


app.use("/user",authRoutes)
app.use("/quiz",quizModel)
app.get('/',(req,res)=>{
    console.log("welcome to quiz app")

})
const PORT=3000

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Database connection failed:", err));