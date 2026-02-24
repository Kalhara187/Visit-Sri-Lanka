# Visit Sri Lanka – Tourism Website 🇱🇰

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-blue?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/SQLite-3-blue?style=for-the-badge" alt="SQLite">
</p>

---

## 📌 Project Overview

**Visit Sri Lanka** is a modern tourism information website created to help local and foreign travelers easily explore Sri Lanka. The website provides details about tourist destinations, hotels, tour packages, and useful travel tips in one convenient platform.

The project features a modern React-based frontend with Tailwind CSS and a Node.js/Express backend with SQLite database.

---

## 🎯 Objectives

- Promote tourism in Sri Lanka
- Provide accurate travel information in one place
- Help tourists plan trips easily
- Enable hotel viewing and booking features
- Collect user feedback to improve services

---

## 🧩 Main Features

### Pages & Components
| Page | Description |
|------|-------------|
| **Landing Page** | Hero section with video background, featured destinations, hotels, and tour packages |
| **Destinations** | List of popular tourist destinations with images and descriptions |
| **Hotels** | Hotel and accommodation details with prices and facilities |
| **Tour Packages** | Travel packages (3-day, 5-day, 7-day plans) |
| **About** | Information about Sri Lanka tourism |
| **Contact** | Contact form with location map |
| **Feedback** | User feedback form with 5-star rating system |
| **Sign In/Register** | User authentication system |

### Navigation Features
- 🖥️ **Responsive Navbar** - Works on desktop and mobile
- 🌊 **Scroll-based Theme** - Ocean blue gradient at top, white glass effect when scrolled
- ✨ **Smooth Animations** - Gradient underlines, hover effects, scale transitions
- 🏝️ **Tropical Logo** - Palm tree, sun, and wave design representing Sri Lanka's beauty
- 📱 **Mobile Menu** - Hamburger menu with slide-down animation

### Feedback Form Features
- 👤 **User Information** - Name and email fields
- 📂 **Category Selection** - Hotel / Tour / Website Experience
- ⭐ **5-Star Rating** - Interactive star rating with labels (Poor, Fair, Good, Very Good, Excellent)
- 📝 **Feedback Message** - Text area for detailed feedback
- ✅ **Form Validation** - Required field validation
- 🎨 **Success Message** - Confirmation after submission

---

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Tailwind CSS 3.4** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **bcryptjs** - Password hashing
- **JSON Web Token** - Authentication

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```
bash
git clone <repository-url>
cd Visit-Sri-Lanka
```

2. **Install backend dependencies**
```
bash
cd backend
npm install
```

3. **Install frontend dependencies**
```
bash
cd frontend
npm install
```

4. **Start the development servers**

Backend:
```
bash
cd backend
npm start
```
Server will run on http://localhost:5000

Frontend:
```
bash
cd frontend
npm run dev
```
Website will open at http://localhost:5173

---

## 📁 Project Structure

```
Visit-Sri-Lanka/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── database.js
│   ├── package.json
│   ├── server.js
│   └── visit-sri-lanka.db
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── page/
│   │   │   │   ├── AboutPage.jsx
│   │   │   │   ├── ContactPage.jsx
│   │   │   │   ├── DestinationsPage.jsx
│   │   │   │   ├── FeedbackPage.jsx
│   │   │   │   ├── HotelsPage.jsx
│   │   │   │   ├── landingpage.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── SignIn.jsx
│   │   │   │   ├── TermsAndConditionsPage.jsx
│   │   │   │   └── TourPackagesPage.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 👥 Users of the System

| User Type | Features |
|-----------|----------|
| **Tourists** | View destinations, browse hotels, book packages |
| **Hotel Owners** | Add and manage hotel details (future) |
| **Administrator** | Manage the whole website (future) |

---

## 🎨 Design Features

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Ocean Blue | #0077BE | Primary brand color |
| Teal | #008080 | Secondary color |
| Saffron | #FF9933 | Accent color |
| Gold | #FFD700 | Highlights |
| White | #FFFFFF | Backgrounds |
| Black | #000000 | Text |

### Navigation Bar Theme
- **At Top**: Dark ocean gradient with white text
- **When Scrolled**: White glass effect with dark text
- **Logo**: Tropical design with palm tree, sun, and waves
- **Animations**: Smooth 300-500ms transitions

---

## 🔄 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/user` | Get user data |

---

## 🚧 Future Improvements

- [ ] Online payment integration
- [ ] Multi-language support (Sinhala, Tamil)
- [ ] Real-time booking confirmation
- [ ] Admin panel for content management
- [ ] Hotel booking system
- [ ] Tour package booking
- [ ] Review and rating system
- [ ] Photo gallery
- [ ] Travel blog

---

## 📄 License

This project is created for educational purposes.

---

<p align="center">
  🇱🇰 **Discover the Pearl of the Indian Ocean** 🇱🇰
</p>
