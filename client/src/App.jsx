

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Room from "./pages/Room";
import About from "./pages/About";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    return (
        <BrowserRouter>

            <nav className="navbar">

                <div className="logo">
                    🎵 Listen Buddy
                </div>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>

                    <button
                        className="theme-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                        title="Toggle theme"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                </div>

            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-room" element={<CreateRoom />} />
                <Route path="/join-room" element={<JoinRoom />} />
                <Route path="/room/:roomId" element={<Room />} />
                <Route path="/about" element={<About />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;