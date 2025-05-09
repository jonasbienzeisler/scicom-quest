# SciCom Quest

A web‐based questionnaire measuring attitudes across three dimensions (politics, neutrality, authority), followed by yes/no questions, demographics, reflection, and an interactive 3D visualization of your results against aggregated participant data.

## Features
- **Vue 3 + Pinia + vue-i18n** front-end  
- **Express + helmet** back-end serving API & built UI  
- Session persistence with `sessionId` + appended logs in `logs/results.txt`  
- 3D Plotly visualization: your responses (red dot) vs. historical participants (colored by discipline)  
- German ↔ English switch, responsive layout  

## Prerequisites
- Git  
- Node.js v18+ & npm v8+  
- (Windows) WSL 2 or Git Bash  
- Docker Desktop (WSL 2 integration) for containerized setup  

## Project Setup

```bash
# Clone, then for both approaches:
cd scicom_quest

## Local Development

# 1) Backend
cd backend
npm install
npm start      # runs on http://localhost:3000/

# 2) Frontend (new shell)
cd frontend
npm install
npm run serve  # runs on http://localhost:8080/, proxies /api to port 3000

## Production Docker
docker compose build
docker compose up -d
# Visit http://localhost:3000/
# Logs persist to host ./logs/results.txt


## Configuration & Logs
Config JSONs: backend/config/*.json
Logs: appended to backend/logs/results.txt (mounted as ./logs in Docker)

## License
This work is licensed under CC BY 3.0 by Jonas Bienzeisler & Nils Bienzeisler

