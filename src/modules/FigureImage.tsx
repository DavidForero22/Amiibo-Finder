import React from "react";
import type { Amiibo } from "../context/AmiiboContext";

interface Props {
    amiibo: Amiibo;
    /** Pass "" when a visible caption already names the figure. */
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    loading?: "lazy" | "eager";
}

/**
 * Figure artwork. Serves the WebP rendition when the API provided one and falls
 * back to the original PNG (collections saved before the API switch lack WebP).
 */
const FigureImage: React.FC<Props> = ({ amiibo, alt, className, style, loading = "lazy" }) => (
    <picture>
        {amiibo.imgwebp && <source srcSet={amiibo.imgwebp} type="image/webp" />}
        <img
            src={amiibo.image}
            alt={alt}
            className={className}
            style={style}
            loading={loading}
            decoding="async"
            draggable={false}
        />
    </picture>
);

export default FigureImage;
