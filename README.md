# SpendWise - Financial Tracker

SpendWise is a personal finance tracking application designed to help users manage their expenses, categorize transactions, and gain insights into their financial habits.

## Highlights
- **Secure & Reliable**: JWT-based authentication and OTP verification ensure secure access.
- **User-Friendly Interface**: Simple and intuitive UI built with React.js and Tailwind CSS.
- **Real-time Insights**: Interactive transaction charts for better financial analysis.
- **Fast Performance**: Built with Vite for optimized frontend performance.
- **Responsive Design**: Works seamlessly across all devices.

## Key Features
- User authentication (Register/Login/Forgot Password)
- Secure JWT-based authentication
- Category management (Add, Update, List categories)
- Transaction management (Add, View, Analyze transactions)
- OTP-based account verification
- Interactive transaction charts for financial analysis
- Toast notifications for user feedback

## Tech Stack
### Backend
- **Node.js** with **Express.js** (REST API)
- **MongoDB** (Database)
- **JWT** for authentication
- **Mongoose** for data modeling

### Frontend
- **React.js** with **Vite**
- **Redux (Zustand)** for state management
- **Axios** for API requests
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications

## Directory Structure
```
karanj7890-spendwise/
├── backend/
│   ├── app.js                # Main backend entry point
│   ├── controllers/          # Controllers for business logic
│   ├── middlewares/          # Middleware for authentication
│   ├── model/                # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Helper functions (DB, JWT handling)
│   ├── package.json          # Backend dependencies
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/            # React pages
│   │   ├── store/            # Zustand stores
│   │   ├── lib/              # Axios setup
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite config
│   └── index.html            # Main entry file
```

## Installation & Setup
### Backend Setup
1. Navigate to the backend folder:
   
   cd backend
   
2. Install dependencies:
   
   npm install

3. Set up environment variables (`.env` file):
  
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the backend server:
   npm start

### Frontend Setup
1. Navigate to the frontend folder:
   cd frontend
   
2. Install dependencies:
   npm install

3. Start the development server:   
   npm run dev


## API Endpoints
### Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Authenticate user
- `POST /api/user/forgot-password` - Initiate password reset

### Categories
- `POST /api/category/add` - Add a new category
- `GET /api/category/list` - Fetch all categories

### Transactions
- `POST /api/transaction/add` - Add a new transaction
- `GET /api/transaction/list` - Get transaction history

