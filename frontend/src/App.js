import { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    fetchTasks();
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
      <input onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

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