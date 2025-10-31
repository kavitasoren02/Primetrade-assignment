# Notes Application

A full-stack notes application built with React + Vite (Frontend) and Express + MongoDB (Backend).

## Features

- User authentication with email and password
- Cookie-based session management
- Create, read, update, and delete notes
- Search and filter notes
- Responsive design with Tailwind CSS
- Protected routes requiring authentication

## Project Structure

```
.
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   └── index.html
└── backend/           # Express + Node.js API
    ├── src/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── index.ts
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   npm install
   ```

2. Create `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/notes-app
   PORT=5000
   JWT_SECRET=your-secret-key-here-change-in-production
   NODE_ENV=development
   ```

3. Make sure MongoDB is running

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get single note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- HttpOnly cookies for session management
- CORS configuration
- Protected routes on frontend
- Server-side authorization checks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Scaling Considerations

For production scaling:

1. **Database**: Use MongoDB Atlas for cloud hosting
2. **API**: Deploy backend to Vercel, AWS, or similar
3. **Frontend**: Deploy to Vercel, Netlify, or similar
4. **Caching**: Implement Redis for session management
5. **API Gateway**: Add rate limiting and authentication layer
6. **Monitoring**: Use services like Sentry for error tracking
7. **Testing**: Add Jest, React Testing Library, and Supertest
8. **CI/CD**: Set up GitHub Actions for automated testing and deployment

## Development

The application uses:
- React 19 with TypeScript
- Vite for fast bundling
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Express for backend API
- MongoDB for database
- JWT for authentication
