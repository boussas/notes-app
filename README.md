# Notes App
A full-stack web application for creating, managing, and organizing notes with user authentication.

## Features
- User authentication (Signup/Login)
- Create, read, update, and delete notes (CRUD functionality)
- Organized note management with categories/tags
- Responsive and modern UI
- Secure backend API with JWT authentication

## Technologies Used

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose for database management)
- JSON Web Token (JWT) for authentication

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database)
- [Git](https://git-scm.com/)

### Setup Instructions

#### 1. Clone the repository
```bash
git clone https://github.com/boussas/notes-app.git
cd notes-app
```

#### 2. Set up the backend
```bash
cd backend
npm install
```

#### 3. Set up the frontend
```bash
cd ../frontend
npm install
```

#### 4. Configure environment variables
Create a `.env` file in the `backend` directory and add:
```ini
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### 5. Run the application
Open two terminals and execute the following:

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/signup` | POST | Register a new user |
| `/api/users/login` | POST | Authenticate and log in a user |

### Notes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/notes` | GET | Fetch all notes |
| `/api/notes` | POST | Create a new note |
| `/api/notes/:id` | DELETE | Delete a note |
| `/api/notes/:id` | PATCH | Update an existing note |
| `/api/notes/togglePin/:id` | PATCH | Toggle pin status of a note |

