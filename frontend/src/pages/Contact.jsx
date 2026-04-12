import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
            </main>
            <Footer />
        </div>
    );
}