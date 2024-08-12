import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors'; 

const app = express();
const port = 3000;

app.use(cors());  

app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',  
  user: 'root',       
  password: '',  
  database: 'flashcard_learning_tool', 
});

// API endpoint to insert a new question and answer
app.post('/insert-question', async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).send({ message: 'Question and answer are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO que_and_ans (question, answer, qlike, qdislike) VALUES (?, ?, ?, ?)',
      [question, answer, 0, 0]
    );

    res.status(201).send({
      message: 'Question inserted successfully',
      questionId: result.insertId,
    });
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).send({ message: 'Failed to insert question' });
  }
});

app.get('/fetch-question', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, question, answer, qlike, qdislike FROM que_and_ans');

    res.status(200).send({
      message: 'Questions fetched successfully',
      questions: rows,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send({ message: 'Failed to fetch questions' });
  }
});

app.delete('/delete-question/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
      const [result] = await pool.query('DELETE FROM que_and_ans WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
          return res.status(404).send({ message: 'Question not found' });
      }

      res.status(200).send({ message: 'Question deleted successfully' });
  } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).send({ message: 'Failed to delete question' });
  }
});

// API endpoint to like a question
app.post('/like-question/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'UPDATE que_and_ans SET qlike = qlike + 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Question not found' });
    }

    res.status(200).send({ message: 'Question liked successfully' });
  } catch (error) {
    console.error('Error liking question:', error);
    res.status(500).send({ message: 'Failed to like question' });
  }
});

// API endpoint to dislike a question
app.post('/dislike-question/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'UPDATE que_and_ans SET qdislike = qdislike + 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Question not found' });
    }

    res.status(200).send({ message: 'Question disliked successfully' });
  } catch (error) {
    console.error('Error disliking question:', error);
    res.status(500).send({ message: 'Failed to dislike question' });
  }
});


// Get a specific question by ID
app.get('/get-question/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
      const [rows] = await pool.query('SELECT question, answer FROM que_and_ans WHERE id = ?', [id]);

      if (rows.length === 0) {
          return res.status(404).send({ message: 'Question not found' });
      }

      res.status(200).send({
          message: 'Question fetched successfully',
          question: rows[0],
      });
  } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).send({ message: 'Failed to fetch question' });
  }
});


// Update a question and answer by ID
app.put('/update-question/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!question || !answer) {
      return res.status(400).send({ message: 'Question and answer are required' });
  }

  try {
      const [result] = await pool.query(
          'UPDATE que_and_ans SET question = ?, answer = ? WHERE id = ?',
          [question, answer, id]
      );

      if (result.affectedRows === 0) {
          return res.status(404).send({ message: 'Question not found' });
      }

      res.status(200).send({ message: 'Question updated successfully' });
  } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).send({ message: 'Failed to update question' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
