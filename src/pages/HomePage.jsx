import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import DomesticViolenceStats from "../components/DomesticViolenceStats.jsx";
import MissionVisionValues from "../components/MissionVisionValues.jsx";
import ContactHome from "../components/ContactHome.jsx";
import Footer from "../components/Footer.jsx";
import Donators from "../components/Donators.jsx";
import AskForAdvice from "../components/AskForAdvice.jsx";

export default function HomePage(){
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Banner />
            <MissionVisionValues />
            <DomesticViolenceStats />
            <AskForAdvice />
            <ContactHome />
            <Donators />
            <Footer />
        </div>
    );
}