import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useTranslation } from "react-i18next";
import Header from "../modules/Header";
import Footer from "../modules/Footer";
import { useAmiibo } from "../context/AmiiboContext";
import { useMotion } from "../context/MotionContext";
import "../styles/main.css";

/* Confetti in the room's own materials: brass, cobalt wrap, wall green, paper */
const CONFETTI_COLORS = ["#f0c768", "#d4a03a", "#2d4ce0", "#4a68f5", "#1f5a48", "#f5f7f9"];

/**
 * Page chrome (skip link, header, main, footer) and the unlock confetti.
 * Also keeps the document title in step with the route and announces route
 * changes, which a single-page app does not do on its own.
 */
const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation();
    const { isConfettiActive, stopConfetti } = useAmiibo();
    const { reduceMotion } = useMotion();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [announcement, setAnnouncement] = useState("");
    const isFirstRoute = useRef(true);

    const pageName = pathname === "/unlock" ? t("header.nav.unlock") : t("header.nav.collection");

    // Descriptive title per page (2.4.2); also follows language changes
    useEffect(() => {
        document.title = `${pageName} · ${t("common.appName")}`;
    }, [pageName, t, i18n.resolvedLanguage]);

    // Tell screen readers the page changed, but not on the first load
    useEffect(() => {
        if (isFirstRoute.current) {
            isFirstRoute.current = false;
            return;
        }
        setAnnouncement(pageName);
        // Only a navigation announces; a language switch changes `pageName` too
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // With reduced motion there is no confetti; clear the flag right away
    useEffect(() => {
        if (isConfettiActive && reduceMotion) stopConfetti();
    }, [isConfettiActive, reduceMotion, stopConfetti]);

    return (
        <div className="app-container">
            <a href="#main" className="skip-link">
                {t("common.skipToContent")}
            </a>

            <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
                {announcement}
            </div>

            {isConfettiActive && !reduceMotion && (
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
