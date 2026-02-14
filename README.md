# Quiz — Fullstack React + Node/Vite Project

Comprehensive README for the Quiz project (frontend built with React + Vite; backend using Node.js/Express). This document explains project purpose, structure, setup, development workflow, environment variables, API surface, deployment tips, and contribution guidelines.

---

Table of contents
- Project Overview
- Features
- Tech Stack
- Repository Structure
- Prerequisites
- Environment Variables
- Backend: install & run
- Frontend: install & run
- Database
- API Reference (overview)
- Development workflow
- Deployment
- Contributing
- Troubleshooting
- License & Credits

---

Project Overview
----------------
This repository contains a multiplayer/hosted quiz application. The project is split into two main parts:

- `backend/`: Node.js + Express REST API, user management, and database integration.
- `frontend/`: React application scaffolded with Vite that implements the quiz UI and game flows.

The app supports user sign-up/sign-in, creating or hosting quizzes, running quiz sessions, and a leaderboard view.

Goals for this README
- Make it fast to get the app running locally (frontend + backend).
- Document configuration and environment variables.
- Provide a concise API overview so frontend and backend integrate smoothly.

Features
--------
- User authentication (sign up / sign in).
- Host quiz creation and hosting flow.
- Play quizzes through a live game view.
- Leaderboard and profile pages.
- Responsive UI built using React components in `frontend/src/components`.

Tech Stack
----------
- Frontend: React, Vite, plain CSS (see `frontend/src`).
- Backend: Node.js, Express (see `backend/server.js`).
- Database: MongoDB (recommended) via Mongoose (see `backend/dataabase/db.js`).
- Dev tools: npm, vite, optionally Docker for containerized deployment.

Repository Structure
--------------------
Top-level layout:

- `backend/` — Express server, routes, controllers, models.
  - `server.js` — main server entry.
  - `server-Chirag.js` — alternate server file (keep or remove if unused).
  - `controllers/` — request handlers (`UserControler.js`).
  - `route/` — route definitions (`UserRoute.js`).
  - `models/` — Mongoose models (`UserModel.js`).
  - `dataabase/db.js` — database connection helper.

- `frontend/` — React app (Vite).
  - `src/` — components, contexts, views.
  - `package.json` — frontend scripts and deps.
  - `vite.config.js` — Vite config.

- `README.md` — this file.

Prerequisites
-------------
- Node.js 16+ (recommended LTS).
- npm or yarn.
- MongoDB (local or Atlas). If using MongoDB Atlas, have your connection URI ready.

Environment Variables
---------------------
Create a `.env` file in `backend/` (or set variables in your environment). Common variables used by the backend:

- `PORT` — port the backend listens on (default: `5000`).
- `MONGODB_URI` — MongoDB connection string (required).
- `JWT_SECRET` — secret used for signing JWT tokens (for auth). Set a strong value.

Example `.env` (backend/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizdb
JWT_SECRET=replace-with-a-strong-secret
```

Backend — Install & Run
-----------------------
1. Open a terminal in the `backend/` folder.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the server (development):

```bash
# plain node
npm run start

# or if project has a dev script (nodemon)
npm run dev
```

4. Server entry points:
- `backend/server.js` — primary server file.
- `backend/server-Chirag.js` — alternate copy (verify which one you use).

Frontend — Install & Run
------------------------
1. Open a terminal in the `frontend/` folder.
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the dev server (Vite hot reload):

```bash
npm run dev
```

4. The frontend will typically be available at `http://localhost:5173` (Vite default). The app expects the backend API to be reachable; configure proxy or `BASE_URL` in the frontend if necessary.

Running both locally
--------------------
Option A: Start backend and frontend in two terminals (recommended):

Terminal 1 (backend):
```bash
cd backend
npm run dev
```

Terminal 2 (frontend):
```bash
cd frontend
npm run dev
```

Option B: Use a process manager or `concurrently` to run both with one command. To add this, install `concurrently` in the repo root or use a small script in a package.json.

Database
--------
This project assumes MongoDB. You can run MongoDB locally or use Atlas.

Local MongoDB quick start (macOS / Linux):

```bash
# With Homebrew (mac)
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

Alternatively, create a free cluster on MongoDB Atlas and copy the connection string into `MONGODB_URI`.

API Reference (overview)
------------------------
Note: check `backend/route` and `backend/controllers` for exact implementations and route paths. Typical user-related endpoints could include:

- `POST /api/users/register` — register a new user.
- `POST /api/users/login` — login and receive a JWT.
- `GET /api/users/profile` — fetch the signed-in user's profile (protected).

Adjust paths in the frontend if your backend mounts routes under a different base path.

Development Notes & Architecture
--------------------------------
- Controllers in `backend/controllers` contain business logic for routes.
- Mongoose models live in `backend/models` and define the DB schema.
- Frontend uses React contexts (`frontend/src/context`) for global state like auth and game state.

Code style & linters
--------------------
- Frontend contains ESLint configuration at `frontend/eslint.config.js`.
- Follow existing patterns when adding components (place general UI components in `frontend/src/components` and page-level views in `frontend/src/views`).

Testing
-------
There are no tests included by default. Recommended additions:
- Backend: unit tests for controllers and integration tests for routes (Jest + Supertest).
- Frontend: component and integration tests (React Testing Library + Jest / Vitest).

Deployment
----------
Frontend build + host:

```bash
cd frontend
npm run build
# deploy the `dist/` output to Netlify / Vercel / static host
```

Backend deployment:
- Make sure `MONGODB_URI` and `JWT_SECRET` are set for the production environment.
- Use services like Heroku, Render, DigitalOcean App Platform, or an Azure/AWS VM.

Docker (optional)
-----------------
You can containerize each part. Basic `Dockerfile` examples:

- Backend: Node base image, copy `backend/`, `npm install`, expose port and run `node server.js`.
- Frontend: build static files with Vite and serve with a lightweight server (nginx or `serve`).

Security notes
--------------
- Do NOT commit `.env` or any secret keys into the repository.
- Use strong secrets for `JWT_SECRET` and restrict DB user permissions for production.

Contributing
------------
1. Fork the repo and create a feature branch.
2. Open a pull request describing the change.
3. Keep changes focused and add tests where applicable.

Troubleshooting
---------------
- If frontend cannot reach API, verify the backend `PORT` and any proxy settings in `vite.config.js` or `frontend/package.json`.
- If DB connection fails, double-check `MONGODB_URI` and that MongoDB is running.
- Review server logs printed by `backend/server.js` for stack traces.

Where to look in the code
------------------------
- Backend server startup: `backend/server.js`
- DB connection helper: `backend/dataabase/db.js`
- User model: `backend/models/UserModel.js`
- User controllers: `backend/controllers/UserControler.js`
- User routes: `backend/route/UserRoute.js`
- Frontend entry: `frontend/src/main.jsx`

License & Credits
-----------------
This project is provided as-is. Add a license file (e.g., MIT) in the repo root if you plan to open-source it.

Contact / Maintainers
---------------------
If you want help or want me to extend this README (add API details, code snippets, Dockerfiles, CI, or deployment configs), tell me which pieces you'd like next.

---

File: [README.md](README.md)
