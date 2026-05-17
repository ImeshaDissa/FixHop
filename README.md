# FixHop — Mini Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse, filter, and manage them.

Built as a technical assessment.

---

## Live Demo

- **Frontend:** https://fixhop-puce.vercel.app/
- **Backend API:** https://fixhop.up.railway.app

---

## Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend  | Node.js + Express                     |
| Database | MongoDB Atlas                         |
| ODM      | Mongoose                              |
| Hosting  | Vercel (frontend), Railway (backend)  |

---

## Project Structure

```
FixHop/
├── backend/
│   ├── src/
│   │   ├── models/JobRequest.js
│   │   ├── routes/jobs.js
│   │   ├── middleware/errorHandler.js
│   │   └── server.js
│   ├── tests/jobs.test.js
│   ├── seed.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.jsx
│   │   │   ├── globals.css
│   │   │   ├── page.jsx              # Home — job list with filters
│   │   │   └── jobs/
│   │   │       ├── new/page.jsx      # New job form
│   │   │       └── [id]/page.jsx     # Job detail
│   │   ├── components/
│   │   │   ├── JobCard.jsx
│   │   │   └── Badges.jsx
│   │   └── lib/api.js
│   ├── vercel.json
│   ├── .env.local.example
│   └── package.json
└── README.md
```

---

## Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) free-tier cluster

---

## Environment Variables

### Backend — `backend/.env`

Copy `backend/.env.example` to `backend/.env` and fill in your values:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/globaltna?retryWrites=true&w=majority
```

### Frontend — `frontend/.env.local`

Copy `frontend/.env.local.example` to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

When deployed, replace this with your Railway backend URL.

---

## Setup & Run

### 1. Clone and install

```bash
git clone https://github.com/ImeshaDissa/FixHop.git
cd FixHop

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB Atlas URI

# Frontend
cp frontend/.env.local.example frontend/.env.local
```

### 3. (Optional) Seed the database

```bash
cd backend
npm run seed
```

This inserts 8 sample job requests across a range of categories and statuses.

### 4. Run the backend

```bash
cd backend
npm run dev       # development with nodemon
# or
npm start         # production
```

The API runs at `http://localhost:5000`.

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

The app runs at `http://localhost:3000`.

---

## API Reference

| Method | Endpoint      | Description                                                   |
|--------|---------------|---------------------------------------------------------------|
| GET    | /api/jobs     | List all jobs. Supports `?category=`, `?status=`, `?search=` |
| GET    | /api/jobs/:id | Get a single job by ID                                        |
| POST   | /api/jobs     | Create a new job request                                      |
| PATCH  | /api/jobs/:id | Update status only (`Open`, `In Progress`, `Closed`)          |
| DELETE | /api/jobs/:id | Delete a job request                                          |

### Example POST body

```json
{
  "title": "Leaking kitchen tap",
  "description": "Cold tap under the kitchen sink dripping for two weeks.",
  "category": "Plumbing",
  "location": "Glasgow",
  "contactName": "Sandra McAllister",
  "contactEmail": "sandra@example.com"
}
```

---

## Running Tests

Tests cover GET (list, filters), POST (create, validation), and PATCH (status update) endpoints.

```bash
cd backend
npm test
```

Requires a valid `MONGODB_URI` in `backend/.env`. Test data is created and cleaned up automatically after each test run.

---

## Features

- Browse all job requests as cards on the home page
- Filter by category and status; search by keyword across title and description
- Post a new request with client-side and server-side validation
- View full job detail, update status via dropdown, delete request
- Responsive layout, works on mobile and desktop

---

## Bonus Features Implemented

- Keyword search (`?search=`) across title and description via MongoDB `$regex`
- Seed script (`npm run seed`) with 8 realistic sample jobs
- Unit tests on GET, POST, and PATCH endpoints using Jest and Supertest
- Deployed frontend to Vercel and backend to Railway with live URLs above
