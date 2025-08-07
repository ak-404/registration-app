# Basti Ki Pathshala Foundation - Registration App

A modern, full-stack web application for managing intern and volunteer registrations at Basti Ki Pathshala Foundation.

## ✨ Features

### Frontend
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Registration System**: Easy application process for interns and volunteers
- **Admin Dashboard**: Comprehensive management interface for applications
- **Authentication**: Secure admin login with persistent sessions
- **Responsive Design**: Mobile-first approach, works on all devices

### Backend
- **RESTful API**: Clean, organized API endpoints
- **MongoDB Integration**: Robust data storage with proper indexing
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation and error handling
- **Environment Configuration**: Secure configuration management

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast development build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js (v16+ recommended)
- MongoDB (running locally or remote connection)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ak-404/registration-app.git
cd registration-app
```

### 2. Backend Setup
```bash
cd server
npm install

# Create environment file (already created with defaults)
# Edit .env file with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install

# Start development server
npm run dev
```

### 4. Environment Configuration

#### Server (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/registration-app
JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this_in_production
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> 📝 **Note**: The admin user is already created in the database with the credentials mentioned below.

#### Client (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_API_AUTH_URL=http://localhost:5000/api/auth
VITE_API_APPLICANTS_URL=http://localhost:5000/api/applicants
```

## 🏃‍♂️ Running the Application

1. **Start MongoDB** (if running locally)
2. **Start Backend Server**:
   ```bash
   cd server
   npm run dev
   ```
   Server runs on: http://localhost:5000

3. **Start Frontend Development Server**:
   ```bash
   cd client
   npm run dev
   ```
   App runs on: http://localhost:5173

## 👤 Admin Credentials

- **Email**: admin@bastikipathshala.org
- **Password**: admin123

> 📝 **Note**: These are the default admin credentials. Anyone can use these to access the admin dashboard.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Applicants
- `POST /api/applicants` - Create new application
- `GET /api/applicants` - Get all applications (admin only)
- `GET /api/applicants/:id` - Get specific application (admin only)
- `DELETE /api/applicants/:id` - Delete application (admin only)

### Registration (Legacy Support)
- `POST /api/register` - Create new application (alias for applicants)

## 🎨 UI Features

### Home Page
- Hero section with call-to-action
- About section with foundation information
- Opportunities showcase (Intern vs Volunteer)
- Impact statistics
- Contact information

### Registration Form
- Form validation with real-time feedback
- Role selection (Intern/Volunteer only)
- Loading states and success/error messages
- Responsive design

### Admin Dashboard
- Application management table
- Filter and sort capabilities
- Delete applications
- Responsive data display
- Logout functionality

## 🔧 Development Features

### Frontend
- Environment-based API configuration
- Persistent authentication state
- Loading states and error handling
- Form validation
- Responsive design
- Modern CSS with animations

### Backend
- ES6 modules with proper imports
- Comprehensive error handling
- Input validation and sanitization
- MongoDB indexing for performance
- JWT token verification middleware
- CORS configuration

## 📝 Data Models

### User (Admin)
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["admin"])
}
```

### Applicant
```javascript
{
  name: String (required, trimmed),
  email: String (required, lowercase, trimmed),
  phone: String (required, trimmed),
  role: String (required, enum: ["Intern", "Volunteer"]),
  message: String (optional, trimmed),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🚀 Production Deployment

### Backend
1. Set environment variables for production
2. Use a production MongoDB instance
3. Change JWT secret to a secure random string
4. Set NODE_ENV=production
5. Use PM2 or similar for process management

### Frontend
1. Update API URLs in .env for production
2. Build the application: `npm run build`
3. Serve the `dist` folder with a web server (Nginx, Apache, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ for Basti Ki Pathshala Foundation** 