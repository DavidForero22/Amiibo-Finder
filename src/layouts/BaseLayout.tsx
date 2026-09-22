import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Header from "../modules/Header";
import Footer from "../modules/Footer";
import { useAmiibo } from "../context/AmiiboContext";
import "../styles/main.css";

/* Confetti in the room's own materials: brass, cobalt wrap, wall green, paper */
const CONFETTI_COLORS = ["#f0c768", "#d4a03a", "#2d4ce0", "#4a68f5", "#1f5a48", "#f5f7f9"];

const useReducedMotion = () => {
    const [reduced, setReduced] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setReduced(query.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);
    return reduced;
};

/**
 * Page chrome (skip link, header, main, footer) and the unlock confetti.
 */
const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isConfettiActive, stopConfetti } = useAmiibo();
    const reducedMotion = useReducedMotion();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // With reduced motion there is no confetti; clear the flag right away
    useEffect(() => {
        if (isConfettiActive && reducedMotion) stopConfetti();
    }, [isConfettiActive, reducedMotion, stopConfetti]);

    return (
        <div className="app-container">
            <a href="#main" className="skip-link">
                Skip to content
            </a>

            {isConfettiActive && !reducedMotion && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={420}
                    gravity={0.18}
                    colors={CONFETTI_COLORS}
                    onConfettiComplete={stopConfetti}
                    style={{ position: "fixed", zIndex: 3000, pointerEvents: "none" }}
                />
            )}

            <Header />
            <main id="main" tabIndex={-1}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default BaseLayout;
