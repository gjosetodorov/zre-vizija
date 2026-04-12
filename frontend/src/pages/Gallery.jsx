import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BannerGallery from "../components/BannerGallery.jsx";
import GalleryContainer from "../components/GalleryContainer.jsx";

export default function Gallery(){
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
                <BannerGallery />
                <GalleryContainer />
            </main>
            <Footer />
        </div>
    );
}