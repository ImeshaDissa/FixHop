# FixHop

A full-stack web application where homeowners can post service requests and tradespeople can browse, filter, and manage them.

---

## Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend  | Node.js + Express                     |
| Database | MongoDB Compass                       |
| ODM      | Mongoose                              |

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
│   │   │   ├── page.jsx              # Home - job list with filters
│   │   │   └── jobs/
│   │   │       ├── new/page.jsx      # New job form
│   │   │       └── [id]/page.jsx     # Job detail
│   │   ├── components/
│   │   │   ├── JobCard.jsx
│   │   │   └── Badges.jsx
│   │   └── lib/api.js
│   ├── .env.local.example
│   └── package.json
└── README.md
```

---

## Prerequisites

- Node.js 18+
- A [MongoDB Compass] (or Mongo Atlass)

---

## Environment Variables

### Backend — `backend/.env`

Copy `backend/.env.example` to `backend/.env` and fill in your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/FixHop
```

### Frontend — `frontend/.env.local`

Copy `frontend/.env.local.example` to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> When deployed, replace this with your Render/Railway backend URL.

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
# Edit backend/.env with your MongoDB URI

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

| Method | Endpoint         | Description                                      |
|--------|------------------|--------------------------------------------------|
| GET    | /api/jobs        | List all jobs. Supports `?category=`, `?status=`, `?search=` |
| GET    | /api/jobs/:id    | Get a single job by ID                          |
| POST   | /api/jobs        | Create a new job request                         |
| PATCH  | /api/jobs/:id    | Update status only (`Open`, `In Progress`, `Closed`) |
| DELETE | /api/jobs/:id    | Delete a job request                             |

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

Tests cover the GET and POST /api/jobs endpoints and PATCH status updates.

```bash
cd backend
npm test
```

> Tests require a valid `MONGODB_URI` in your `backend/.env`. They create and clean up their own data via a separate test database or the same Atlas cluster (a test collection is cleared after each run).

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
- Unit tests on GET (list, filters) and POST (create, validation) and PATCH (status update) endpoints

---

## Deployment

### Backend — Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository, set root to `backend/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGODB_URI`, `PORT`

### Frontend — Vercel

1. Import your GitHub repository on [Vercel](https://vercel.com)
2. Set root directory to `frontend/`
3. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
4. Deploy
