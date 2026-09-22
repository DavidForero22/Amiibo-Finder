import React from "react";
import { Trans, useTranslation } from "react-i18next";
import "../styles/footer.css";

/**
 * Site footer: license, data attribution and the fan-project disclaimer.
 */
const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <p>{t("footer.license")}</p>
                <p>
                    <Trans
                        i18nKey="footer.dataFrom"
                        components={{
                            api: (
                                <a href="https://amiiboapi.org/" target="_blank" rel="noopener noreferrer" />
                            ),
                            hint: <span className="visually-hidden" />,
                        }}
                    />
                </p>
                <p className="site-footer-note">{t("footer.disclaimer")}</p>
            </div>
        </footer>
    );
};

export default Footer;
