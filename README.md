# SciCom Quest

A web-based questionnaire measuring attitudes across three dimensions (politics, neutrality, authority), followed by yes/no questions, demographics, reflection, and an interactive 3D visualization of your results against aggregated participant data.

---

## Features

- **Vue 3 + Pinia + vue-i18n** front-end  
- **Express + helmet** back-end serving API & built UI  
- Session persistence with `sessionId` + appended logs in `logs/results.txt`  
- 3D Plotly visualization: your responses (big red dot) vs. historical participants (colored by discipline)  
- German ↔ English switch, responsive layout  

---

## Prerequisites

- Git  
- Node.js v18+ & npm v8+  
- (Windows) WSL 2 or Git Bash  
- Docker Desktop (with WSL 2 integration)  

---

## Project Setup

```bash
# 1) Clone the project
git clone https://github.com/jonasbienzeisler/scicom-quest.git
cd scicom-quest
```
---

## Debugging locally

# Backend (runs on http://localhost:3000/)
```bash
cd backend
npm install
npm start
```

# Frontend (runs on http://localhost:8080/, proxies /api → 3000)
```bash
cd ../frontend
npm install
npm run serve
```
---

## Production with Docker

# From the repo root (where docker-compose.yml lives):
```bash
docker compose build
docker compose up -d
```

# Then visit:
http://localhost:3000/

# Configuration (from the repo root where docker-compose.yml lives):
Your logs will be persisted to ./logs/results.txt on the host. In ./backend/config right there in your current working directory. The app reads its config from ./backend/config/ (mounted read-only). To apply changes to the config, simply edit the files locally and restart the container while you are in the root folder:

```bash
docker compose restart
```
