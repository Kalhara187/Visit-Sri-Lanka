import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/page/landingpage";
import SignIn from "./components/page/SignIn";
import Register from "./components/page/Register";
import AboutPage from "./components/page/AboutPage";
import ContactPage from "./components/page/ContactPage";
import TourPackagesPage from "./components/page/TourPackagesPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/packages" element={<TourPackagesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

