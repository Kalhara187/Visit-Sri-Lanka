import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/page/landingpage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
