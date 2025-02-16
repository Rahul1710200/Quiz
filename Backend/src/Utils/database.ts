import mysql from "mysql2/promise";
import dotenv from "dotenv";


 
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default pool;
