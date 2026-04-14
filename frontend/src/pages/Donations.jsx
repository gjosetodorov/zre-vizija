import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BannerDonations from "../components/BannerDonations.jsx";
import DonationsContainer from "../components/DonationsContainer.jsx";
import Donators from "../components/Donators.jsx";

export default function Donations(){
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
                <BannerDonations />
                <DonationsContainer />
                <Donators />
            </main>
            <Footer />
        </div>
    );
}