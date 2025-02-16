
import { Request,Response } from "express"
import pool from "../Utils/database"
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
       res
      .status(400)
      .json({ message: "Username and password are required" });
  }



  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    console.log("rrrr",rows)

    if (rows.length > 0) {
       res.json({ message: "Login successful", user: {id:rows[0].id,username:rows[0].username }});
    } else {
       res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};