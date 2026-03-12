import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";

export default function HomePage(){
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-300 to-slate-300">
            <Navbar />
            <Banner />
        </div>
    );
}