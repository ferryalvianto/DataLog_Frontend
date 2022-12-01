import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import "./scss/App.scss";
import Home from "./pages/home";
import NotSupported from "./components/warning/not-supported";
import Navbar from './components/navbar';
import Rating from "./pages/Rating";

export default function AppMobile() {
    return (
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/befresh/form" element={<Rating />} />
                        <Route path="/not-supported" element={<NotSupported />} />
                        <Route path="*" element={<NotSupported />} />
                    </Routes>
                </main>
            </div>
    );
}