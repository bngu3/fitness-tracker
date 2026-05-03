# FitTrack — Fitness Tracker Web App
CMPE 131-05 Software Engineering I

A full-stack fitness tracking web application built with React, Node.js, Express, and SQLite.

## Features
- User registration and login with JWT authentication
- Workout logging with type, duration, and intensity
- Nutrition tracking with macro breakdown (calories, protein, carbs, fats)
- Fitness goals with progress tracking
- Dashboard with charts and summary stats

## Tech Stack
- **Frontend:** React.js, React Router, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** SQLite (via better-sqlite3)
- **Auth:** JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm

### 1. Clone the repo
git clone https://github.com/YOURUSERNAME/fitness-tracker.git
cd fitness-tracker

### 2. Setup Backend
cd backend
npm install

Create a .env file in the backend/ folder:
PORT=5000
JWT_SECRET=supersecretkey123

Start the backend:
npm run dev

### 3. Setup Frontend
cd ../frontend
npm install
npm start

### 4. Open the app
Go to http://localhost:3000 in your browser.
Register a new account and start tracking!

## Project Structure
fitness-tracker/
├── backend/
│   ├── config/db.js        # SQLite setup + schema
│   ├── controllers/        # Auth logic
│   ├── middleware/auth.js  # JWT middleware
│   ├── routes/             # API routes
│   └── server.js           # Express server
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios config
│   │   ├── components/     # Layout, Navbar
│   │   ├── context/        # Auth context
│   │   └── pages/          # Dashboard, Workouts, Nutrition, Goals
└── README.md

## API Endpoints
Method | Route | Description
POST   | /api/auth/register    | Register new user
POST   | /api/auth/login       | Login
GET    | /api/workouts         | Get all workouts
POST   | /api/workouts         | Log a workout
DELETE | /api/workouts/:id     | Delete workout
GET    | /api/nutrition        | Get nutrition logs
POST   | /api/nutrition        | Log food
DELETE | /api/nutrition/:id    | Delete food entry
GET    | /api/goals            | Get goals
POST   | /api/goals            | Create goal
PUT    | /api/goals/:id        | Update goal progress
DELETE | /api/goals/:id        | Delete goal