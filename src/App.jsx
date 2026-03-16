import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import CounselingCenter from "./pages/CounselingCenter.jsx";

import Announcements from "./pages/Announcements.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/za-nas" element={<AboutUs/>}/>
                <Route path="/sovetuvalishte" element={<CounselingCenter />}/>
                <Route path="/oglasi" element={<Announcements/>}/>
                <Route path="/kontakt" element={<Contact/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
