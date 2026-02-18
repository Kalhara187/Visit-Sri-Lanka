import Navbar from "./components/Navbar";
import LandingPage from "./components/page/landingpage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <LandingPage />
      </main>
    </div>
  );
}
