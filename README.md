# DSO101 – Assignment 3: CI/CD with GitHub Actions, Docker & Render

**Student:** Khamsum Yoezer  
**Student ID:** 02250390  
**Course:** DSO101 – Continuous Integration and Continuous Deployment  

---

## Overview

This assignment configures a GitHub Actions workflow to automatically:
1. Build a Docker image for the Node.js backend
2. Push it to DockerHub
3. Deploy it to Render.com via a deploy webhook

The application used is the To-Do List app from Assignment 1.

---

## Repository Structure

```
todo-app/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD pipeline
├── backend/
│   ├── Dockerfile             # Docker config for backend
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Express API server
│   └── db/
│       └── init.sql
├── frontend/
│   ├── Dockerfile
│   └── src/
├── docker-compose.yml
└── README.md
```

---

## Steps Taken

### Task 1 – GitHub Repository Setup
- Verified the repository is **public**
- Confirmed `package.json` contains relevant scripts (`start`, `test`)

### Task 2 – Dockerfile
- Updated `backend/Dockerfile` to use `node:20-alpine` (LTS)
- Added a dedicated `backend/package.json` for backend-only dependencies
- Dockerfile exposes port `5000` and starts with `node server.js`

**Backend Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Task 3 – GitHub Actions Workflow
- Created `.github/workflows/deploy.yml`
- Triggers on every push to `main`
- Steps: checkout → DockerHub login → build & push image → trigger Render webhook

### Task 4 – Render.com Deployment
- Created a new Web Service on Render.com using **"Deploy an existing image"**
- Pointed at DockerHub image: `<DOCKERHUB_USERNAME>/todo-backend:latest`
- Copied the Deploy Hook URL → stored as `RENDER_DEPLOY_HOOK_URL` secret in GitHub

---

## GitHub Secrets Required

| Secret Name               | Description                           |
|--------------------------|---------------------------------------|
| `DOCKERHUB_USERNAME`     | Your DockerHub username               |
| `DOCKERHUB_TOKEN`        | DockerHub access token (not password) |
| `RENDER_DEPLOY_HOOK_URL` | Render deploy webhook URL             |

> Credentials are **never hardcoded** — all stored as GitHub Secrets.

---

## Screenshots

### Successful GitHub Actions Workflow
*(Add screenshot here)*

### DockerHub Image Pushed
*(Add screenshot here)*

### Render.com Deployment
*(Add screenshot here)*

---

## Render Deployment Link

[https://todo-backend-XXXX.onrender.com](https://todo-backend-XXXX.onrender.com)  
*(Replace with actual URL after deployment)*

---

## Challenges Faced

1. **Render does not auto-redeploy on DockerHub push** – Solved by adding a `curl` call to the Render deploy webhook at the end of the GitHub Actions pipeline.
2. **Backend needs its own `package.json`** – Root `package.json` included React dependencies, which would bloat the image. Created a separate `backend/package.json` with only Express/pg/cors/dotenv.
3. **DockerHub token vs password** – GitHub Actions requires a DockerHub access token, not the account password.

---

## Learning Outcomes

- Understood the full CI/CD lifecycle: code push → build → container registry → cloud deployment
- Learned how to write GitHub Actions YAML workflows
- Practiced containerizing a Node.js app with Docker
- Learned to securely manage credentials using GitHub Secrets
- Gained hands-on experience with DockerHub and Render.com