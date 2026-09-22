import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    IoMoonOutline,
    IoSunnyOutline,
    IoNotificationsOutline,
    IoNotificationsOffOutline,
} from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { useNotifications } from "./useNotifications";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import "../styles/header.css";

/** Brand mark: a small isometric gift box. */
const BrandMark = () => (
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <polygon points="32,6 58,21 32,36 6,21" fill="#4a68f5" />
        <polygon points="6,21 32,36 32,60 6,45" fill="#2d4ce0" />
        <polygon points="58,21 32,36 32,60 58,45" fill="#1c34a8" />
        <polygon points="19,13.5 45,28.5 45,31.5 19,16.5" fill="#f0c768" />
        <polygon points="45,13.5 19,28.5 19,31.5 45,16.5" fill="#f0c768" />
        <polygon points="17.5,27.8 20.5,29.5 20.5,53.5 17.5,51.8" fill="#d4a03a" />
        <polygon points="46.5,27.8 43.5,29.5 43.5,53.5 46.5,51.8" fill="#9c7121" />
    </svg>
);

/**
 * Site header: brand, the two rooms of the app, and global actions
 * (notifications, language, day/night, collection data menu).
 */
const Header = () => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { showToast } = useToast();
    const { status, request } = useNotifications();

    const toggleNotifications = async () => {
        if (status === "unsupported") {
            showToast(t("header.notifications.unsupported"), "error");
        } else if (status === "granted") {
            // Browsers don't allow revoking permission from script
            showToast(t("header.notifications.howToDisable"));
        } else if (status === "denied") {
            showToast(t("header.notifications.blocked"), "error");
        } else {
            const result = await request();
            if (result === "granted") showToast(t("header.notifications.enabled"), "success");
        }
    };

    const notifyOn = status === "granted";
    const nightTime = theme === "dark";
    const notifyLabel = notifyOn ? t("header.notifications.on") : t("header.notifications.turnOn");
    const themeLabel = nightTime ? t("header.theme.toLight") : t("header.theme.toDark");

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link to="/" viewTransition className="brand" aria-label={t("header.homeLink")}>
                    <BrandMark />
                    <span className="brand-name">{t("common.appName")}</span>
                </Link>

                <nav className="site-nav" aria-label={t("header.navLabel")}>
                    <NavLink to="/" end viewTransition className="site-nav-link">
                        {t("header.nav.collection")}
                    </NavLink>
                    <NavLink to="/unlock" viewTransition className="site-nav-link">
                        {t("header.nav.unlock")}
                    </NavLink>
                </nav>

                <div className="header-actions">
                    <button
                        type="button"
                        onClick={toggleNotifications}
                        className={`icon-btn ${notifyOn ? "is-on" : ""}`}
                        aria-label={notifyLabel}
                        title={notifyLabel}
                    >
                        {notifyOn ? (
                            <IoNotificationsOutline aria-hidden="true" />
                        ) : (
                            <IoNotificationsOffOutline aria-hidden="true" />
                        )}
                    </button>

                    <LanguageSwitcher />

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="icon-btn"
                        aria-label={themeLabel}
                        title={themeLabel}
                    >
                        {nightTime ? <IoSunnyOutline aria-hidden="true" /> : <IoMoonOutline aria-hidden="true" />}
                    </button>

                    <UserMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
