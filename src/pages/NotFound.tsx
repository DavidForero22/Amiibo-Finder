import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Shown for any URL that is not a route. The static host answers these with a
 * real 404 (see 404.html); this keeps in-app navigation to a bad path useful too.
 */
const NotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="collection-intro not-found" aria-labelledby="notfound-title">
            <h1 id="notfound-title" className="collection-title">
                {t("seo.notFound.heading")}
            </h1>
            <p className="collection-lede">{t("seo.notFound.description")}</p>
            <p>
                <Link to="/" viewTransition className="btn btn-primary">
                    {t("seo.notFound.back")}
                </Link>
            </p>
        </section>
    );
};

export default NotFound;
