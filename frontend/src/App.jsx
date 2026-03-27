import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import CounselingCenter from "./pages/CounselingCenter.jsx";
import Publications from "./pages/Publications.jsx";
import Gallery from "./pages/Gallery.jsx";
import Donations from "./pages/Donations.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/za-nas" element={<AboutUs/>}/>
                <Route path="/sovetuvalishen-centar" element={<CounselingCenter/>}/>
                <Route path="/publikacii" element={<Publications/>}/>
                <Route path="/kontakt" element={<Contact/>}/>
                <Route path="/galerija" element={<Gallery/>}/>
                <Route path="/donacii" element={<Donations/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
