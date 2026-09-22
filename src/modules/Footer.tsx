import React from "react";
import "../styles/footer.css";

/**
 * Site footer: license, data attribution and the fan-project disclaimer.
 */
const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <p>© 2025 Davitroon · MIT License</p>
                <p>
                    Figure data from the{" "}
                    <a href="https://amiiboapi.org/" target="_blank" rel="noopener noreferrer">
                        AmiiboAPI community project
                        <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                </p>
                <p className="site-footer-note">
                    Fan-made project, not affiliated with or endorsed by Nintendo.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
