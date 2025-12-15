# MERN Hotel Booking Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for hotel booking.

## Project Structure

- **backend/**: Express.js server with MongoDB integration
- **frontend/**: React.js application
- **models/**: MongoDB schemas
- **routes/**: API endpoints

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Local Development

1. **Backend Setup**
```bash
cd backend
npm install
```

2. **Frontend Setup**
```bash
cd frontend
npm install
```

3. **Environment Configuration**
Create a `.env` file in the backend folder:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotelDB
PORT=5000
JWT_SECRET=your_secret_key
```

4. **Run Development Servers**

Backend (from backend folder):
```bash
npm run dev
```

Frontend (from frontend folder):
```bash
npm start
```

## Deployment on Vercel

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub/GitLab account with repository pushed

### Steps

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure environment variables:
     - Add `MONGODB_URI` pointing to your MongoDB Atlas database
     - Add `JWT_SECRET`

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at a vercel.app domain

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Hotels Routes
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Add new hotel (admin)

### Bookings Routes
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Database**: MongoDB Atlas
- **Hosting**: Vercel

## License

MIT
