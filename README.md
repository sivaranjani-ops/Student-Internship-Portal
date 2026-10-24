# Student Internship Portal

A web application that allows students to explore internship opportunities and submit applications online.

## Live Demo

- **Frontend:** https://student-internship-portal-pearl.vercel.app/
- **Backend API:** https://student-internship-portal-1.onrender.com

## Technologies Used

### Frontend
- React
- Vite
- React Router
- CSS
- Fetch API for backend communication

### Backend
- Node.js
- Express.js
- REST API
- MongoDB Atlas
- Mongoose
- Environment variables for configuration

## Features

- Home page introducing the portal
- Internship listings with internship titles, company names, durations, and descriptions
- Application form for students
- Backend API integration
- Application data stored in MongoDB Atlas
- Navigation between pages using React Router
- Separate frontend and backend deployments

## Project Structure

```text
student-internship-portal/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Internships.jsx
│   │   └── Apply.jsx
│   ├── App.jsx
│   └── App.css
├── server/
│   ├── server.js
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/VidhyaVarshinicodespace/student-internship-portal.git
cd student-internship-portal
```

### 2. Install frontend dependencies

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Configure the backend

```bash
cd server
npm install
```

Create a `server/.env` file containing your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

Never commit `.env` files or expose database credentials.

### 4. Start the backend

From the `server` directory, run:

```bash
node server.js
```

### 5. Start the frontend

Open another terminal in the project root and run:

```bash
npm run dev
```

Open the local URL displayed by Vite.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/api/internships` | Retrieve internship listings |
| POST | `/api/applications` | Submit an internship application |
| GET | `/api/applications` | Retrieve submitted applications |

## Database

MongoDB Atlas stores submitted internship applications. Mongoose is used to interact with the database.

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

The frontend uses the `VITE_API_URL` environment variable to communicate with the backend.

## Security

- Store database credentials in environment variables.
- Keep `.env` files out of version control.
- Use appropriate MongoDB Network Access restrictions.
- Validate application data on the backend.

## Future Enhancements

- Student login and authentication
- Search and filter internship opportunities
- Application status tracking
- Admin dashboard for managing internships
- Student profile management

## Author

Student Internship Portal — developed as a web application project.
