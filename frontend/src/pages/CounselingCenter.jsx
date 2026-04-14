import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BannerCounselingCenter from "../components/BannerCounselingCenter.jsx";
import CounselingForm from "../components/CounselingForm.jsx";
import CounselingCenterInfo from "../components/CounselingCenterInfo.jsx";
import CounselingCenterLocation from "../components/CounselingCenterLocation.jsx";

export default function CounselingCenter(){
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">
                <BannerCounselingCenter />
                <CounselingCenterInfo />
                <CounselingForm />
                <CounselingCenterLocation />
            </main>
            <Footer />
        </div>
    );
}