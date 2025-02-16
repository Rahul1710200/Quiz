import pool from "../Utils/database"

export const createQuiz=async (title:string,description:string,teacherId:number)=>{

    try{
        const [result]: any = await pool.query(
    "INSERT INTO quizzes (title,description,teacher_Id) VALUES (?, ?,?)",
    [title, description, teacherId]
  );

     const [quiz]: any = await pool.query(
       "SELECT id, title, description, teacher_id, created_at FROM quizzes WHERE id = ?",
       [result.insertId]
     );
  console.log("result",result)

return quiz[0];
    }catch(err){
        console.error("err",err)
    }
   //
}

export const getQuizzes = async () => {
  const [rows]: any = await pool.query("SELECT * FROM quizzes");
  return rows;
};

export const getQuizById = async (id: number) => {
    console.log("idddd",id)
  const [rows]: any = await pool.query(
    "SELECT * FROM quizzes WHERE teacher_id = ? ORDER BY created_at DESC",
    [id]
  );
  console.log(rows)
  return rows.length ? rows : null;
};

export const updateQuiz = async (
  id: number,
  title: string,
  description: string
) => {
  const [result]: any = await pool.query(
    "UPDATE quizzes SET title = ?, description = ? WHERE id = ?",
    [title, description, id]
  );
  return result.affectedRows;
};

export const deleteQuiz = async (id: number) => {
  const [result]: any = await pool.query("DELETE FROM quizzes WHERE id = ?", [
    id,
  ]);
  return result.affectedRows;
};