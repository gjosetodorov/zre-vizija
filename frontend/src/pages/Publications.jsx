import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BannerPublications from "../components/BannerPublications.jsx";
import PublicationsContainer from "../components/PublicationsContainer.jsx";

export default function Publications(){
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
                <BannerPublications />
                <PublicationsContainer />
            </main>
            <Footer />
        </div>
    );
}