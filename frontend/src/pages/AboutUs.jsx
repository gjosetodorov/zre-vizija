import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BannerAboutUs from "../components/BannerAboutUs.jsx";
import InformationAboutUs from "../components/InformationAboutUs.jsx";
import TeamMembers from "../components/TeamMembers.jsx";

export default function AboutUs() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar/>
            <main className="flex-1">
                <BannerAboutUs/>
                <InformationAboutUs/>
                <TeamMembers/>
            </main>
            <Footer/>
        </div>
    );
}