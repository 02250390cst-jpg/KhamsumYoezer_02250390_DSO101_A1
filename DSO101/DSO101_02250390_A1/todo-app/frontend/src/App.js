import { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks`);
      if (!res.ok) {
        throw new Error(`Failed to load tasks (${res.status})`);
      }
      const data = await res.json();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    }
  };

  const addTask = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Title cannot be empty");
      return;
    }

    try {
      const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      });
      if (!res.ok) {
        throw new Error(`Failed to add task (${res.status})`);
      }
      const created = await res.json();
      setTasks((prev) => [...prev, created]);
      setTitle("");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {error && <p>{error}</p>}

      {tasks.map((t) => (
        <div key={t.id}>
          {t.title}
          <button onClick={() => deleteTask(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default App;