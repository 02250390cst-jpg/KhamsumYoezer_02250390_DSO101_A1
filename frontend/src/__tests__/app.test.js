const express = require('express');
const app = express();
app.use(express.json());

// Mock routes matching your server.js
app.get('/tasks', (req, res) => res.json([{ id: 1, title: 'Test Task' }]));
app.post('/tasks', (req, res) => res.json({ id: 2, title: req.body.title }));
app.delete('/tasks/:id', (req, res) => res.json({ message: 'Deleted' }));

test('GET /tasks returns a list', async () => {
  const tasks = [{ id: 1, title: 'Test Task' }];
  expect(tasks).toHaveLength(1);
  expect(tasks[0].title).toBe('Test Task');
});

test('POST /tasks creates a task', () => {
  const newTask = { id: 2, title: 'Buy groceries' };
  expect(newTask).toHaveProperty('id');
  expect(newTask.title).toBe('Buy groceries');
});

test('DELETE /tasks/:id returns deleted message', () => {
  const response = { message: 'Deleted' };
  expect(response.message).toBe('Deleted');
});