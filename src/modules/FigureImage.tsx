import React, { useState } from "react";
import type { Amiibo } from "../context/AmiiboContext";
import notFoundImage from "../assets/image_not_found.webp";

interface Props {
    amiibo: Amiibo;
    /** Pass "" when a visible caption already names the figure. */
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    loading?: "lazy" | "eager";
}

/**
 * How far the artwork has fallen back:
 * 0 the WebP rendition (when the API provided one) with the PNG as the picture's fallback,
 * 1 the PNG alone (the WebP URL failed),
 * 2 the bundled placeholder (the figure images live on a third-party host and may be gone).
 */
type Stage = 0 | 1 | 2;

/**
 * Figure artwork. Serves the WebP rendition when the API provided one, falls
 * back to the original PNG (collections saved before the API switch lack WebP)
 * and, if the host no longer serves the figure, to a bundled placeholder.
 */
const FigureImage: React.FC<Props> = ({ amiibo, alt, className, style, loading = "lazy" }) => {
    const [state, setState] = useState<{ src: string; stage: Stage }>({
        src: amiibo.image,
        stage: 0,
    });

    // A different figure starts over (the same component instance can be reused)
    let stage = state.stage;
    if (state.src !== amiibo.image) {
        stage = 0;
        setState({ src: amiibo.image, stage: 0 });
    }

    const onError = () => {
        const next: Stage = stage === 0 && amiibo.imgwebp ? 1 : 2;
        setState({ src: amiibo.image, stage: next });
    };

    const img = (
        <img
            src={stage === 2 ? notFoundImage : amiibo.image}
            alt={alt}
            className={className}
            style={style}
            loading={loading}
            decoding="async"
            draggable={false}
            onError={stage === 2 ? undefined : onError}
        />
    );

    // The placeholder and the PNG-only stage need no <picture>
    if (stage !== 0 || !amiibo.imgwebp) return <picture>{img}</picture>;

    return (
        <picture>
            <source srcSet={amiibo.imgwebp} type="image/webp" />
            {img}
        </picture>
    );
};

export default FigureImage;
