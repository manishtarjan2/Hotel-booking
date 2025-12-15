# MERN Hotel Booking Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for hotel booking with Vercel deployment.

## Project Structure

```
├── api/                    # Vercel serverless functions
├── backend/                # Express.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   └── package.json
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── .vercelignore           # Vercel ignore rules
├── vercel.json             # Vercel configuration
└── package.json            # Root package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free at mongodb.com)
- npm or yarn
- Git and GitHub account (for Vercel deployment)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd MERN_Hotel_Booking_Code
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Configuration
Create a `.env` file in the `backend` folder:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotelDB
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 5. Run Development Servers

**Backend** (from project root):
```bash
cd backend
npm run dev
```

**Frontend** (from project root in a new terminal):
```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000` and API will be at `http://localhost:5000`.

## Vercel Deployment

### Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- Repository pushed to GitHub

### Step-by-Step Deployment

#### 1. Prepare for Deployment
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### 2. Set Up on Vercel
- Visit [vercel.com](https://vercel.com)
- Click **"New Project"**
- Select your GitHub repository
- Vercel will auto-detect this is a monorepo with Next.js/React

#### 3. Configure Environment Variables
In Vercel project settings, add these environment variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Your JWT secret key |
| `NODE_ENV` | `production` |

#### 4. Deploy
- Click **"Deploy"**
- Vercel will automatically build and deploy
- Your app will be live at `https://your-project.vercel.app`

### Post-Deployment

Your application will be accessible at:
- Frontend: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api`

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT token)

### Hotels Routes
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Add new hotel

### Bookings Routes
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings

## Technologies Used

### Frontend
- React 18
- React Router DOM v6
- Axios (HTTP client)

### Backend
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- CORS

### Database
- MongoDB Atlas (Cloud Database)

### Deployment
- Vercel (Serverless Hosting)

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string in environment variables
- Ensure IP whitelist includes Vercel's IPs or set to `0.0.0.0/0`
- Check MongoDB Atlas database and user credentials

### CORS Errors
- Verify `FRONTEND_URL` environment variable is set
- Check CORS middleware in `backend/server.js`

### Build Failures
- Clear build cache: `vercel env pull --environment=production`
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility

## Contributing

1. Create a feature branch: `git checkout -b feature/YourFeature`
2. Commit changes: `git commit -m 'Add YourFeature'`
3. Push to branch: `git push origin feature/YourFeature`
4. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue in the GitHub repository.

