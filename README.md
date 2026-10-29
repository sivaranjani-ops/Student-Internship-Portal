# Student Internship Portal

MERN internship portal to browse opportunities, view details, and submit applications.

## Local setup
- Root backend: `npm install`, then create `.env` using `.env.example`, and run `npm run dev`.
- Frontend: `cd client && npm install && npm run dev`.
- Backend uses `MONGO_DB_URI` from the root `.env`.
- API routes: `GET /api/internships`, `GET /api/internships/:id`, `POST /api/applications`, `GET /api/applications`, and `GET /api/health`.

## Deploy
- Deploy repository root to a Node.js host and set `MONGO_DB_URI` in its environment settings.
- Deploy the `client` folder to Vercel.
- In Vercel, set `VITE_API_URL` to your deployed backend URL including `/api`, e.g. `https://your-backend.example/api`.
- Keep `.env` private; never commit database credentials.
- The top navigation contains Home and Apply. The internship opportunities are displayed on Home.
