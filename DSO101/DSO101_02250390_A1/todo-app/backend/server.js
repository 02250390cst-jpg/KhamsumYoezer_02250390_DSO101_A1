require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "todo",
  port: Number(process.env.DB_PORT) || 5432,
});

// Create Task
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.json(result.rows[0]);
});

// Get Tasks
app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});