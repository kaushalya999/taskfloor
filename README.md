# TaskFlow

A full-stack task manager built with the **MERN** stack (MongoDB, Express, React, Node.js). Users can register, log in, and manage their own tasks. Each user only sees their own data.

I built this project to learn and revise Node.js and React by building something complete from start to finish.

## Features

- User registration and login with **JWT authentication**
- Passwords hashed with **bcrypt**
- Create, view, edit, complete and delete tasks (full **CRUD**)
- Tasks are private to each user (ownership check on every request)
- Protected routes in React (redirects to login when not signed in)
- Loading and error messages in the UI

## Tech stack

| Layer    | Technology                               |
| -------- | ---------------------------------------- |
| Frontend | React (Vite), React Router, Axios        |
| Backend  | Node.js, Express                         |
| Database | MongoDB with Mongoose                    |
| Auth     | JSON Web Tokens (jsonwebtoken), bcryptjs |

## Screenshots

### Login
<img width="731" height="453" alt="Login page" src="https://github.com/user-attachments/assets/0d80abff-e3c9-45ec-89d9-d9fe89bbf877" />

### Tasks
<img width="862" height="593" alt="Tasks" src="https://github.com/user-attachments/assets/cb8d26a0-17c3-4b70-afaf-10658f267095" />

## Project structure

```
taskflow/
├── server/
│   ├── middleware/
│   │   └── auth.js          # checks the JWT on protected routes
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js          # register and login
│   │   └── tasks.js         # task CRUD
│   └── server.js            # app entry point
└── client/
    └── src/
        ├── components/
        │   ├── ProtectedRoute.jsx
        │   └── TaskItem.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Tasks.jsx
        ├── api.js           # Axios instance with token interceptor
        ├── App.jsx
        └── main.jsx
```

## API endpoints

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| POST   | `/auth/register` | Create an account, returns a token |
| POST   | `/auth/login`    | Log in, returns a token            |

### Tasks (require `Authorization: Bearer <token>`)

| Method | Endpoint     | Description                         |
| ------ | ------------ | ----------------------------------- |
| GET    | `/tasks`     | Get all tasks of the logged-in user |
| POST   | `/tasks`     | Create a task                       |
| PUT    | `/tasks/:id` | Update a task                       |
| DELETE | `/tasks/:id` | Delete a task                       |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS)
- MongoDB running locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository

```bash
git clone https://github.com/kaushalya999/taskflow.git
cd taskflow
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=replace_this_with_a_long_random_string
PORT=5000
```

If you use MongoDB Atlas, put your Atlas connection string in `MONGO_URI` instead.

Start the server:

```bash
npm run dev
```

You should see `MongoDB connected` and `Server running on port 5000`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

## What I learned

- Building a REST API with Express, including routing and custom middleware
- Modeling data with Mongoose schemas and referencing documents (tasks belong to users)
- Password hashing and stateless authentication with JWT
- React fundamentals: components, props, state, `useEffect`, controlled forms, conditional rendering and lists
- Client-side routing and protecting pages for logged-in users
- Connecting a React frontend to a Node backend with Axios and handling CORS

## Possible improvements

- Input validation with `express-validator`
- Central error-handling middleware
- Task due dates, priorities and filters
- Deploy the API to Render and the frontend to Vercel
- A Flutter mobile app that uses the same API

## Author

**Kaushalya Perera**
[GitHub](https://github.com/kaushalya999)
