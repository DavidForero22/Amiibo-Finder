import React, { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoHeart, IoHeartOutline, IoInformationCircleOutline } from "react-icons/io5";
import { useAmiibo, type Amiibo } from "../context/AmiiboContext";
import { formatUnlockedAt, formatReleaseDate } from "../logic/utils";
import FigureImage from "./FigureImage";
import "../styles/amiibo-card.css";

interface Props {
	amiibo: Amiibo;
}

const REGIONS = ["na", "eu", "jp", "au"] as const satisfies readonly (keyof Amiibo["release"])[];

/**
 * One figure in the ledger: a display box that flips over to show its record
 * card (unlock date, amiibo series, release per region), plus a favorite toggle.
 * A transparent button over the card owns the flip; the favorite sits above it.
 */
const AmiiboCard: React.FC<Props> = ({ amiibo }) => {
	const { t, i18n } = useTranslation();
	const { toggleFavorite } = useAmiibo();
	const [isFlipped, setIsFlipped] = useState(false);
	const backId = useId();
	const isFavorite = !!amiibo.isFavorite;
	const locale = i18n.resolvedLanguage;

	return (
		<li className={`tile ${isFavorite ? "is-favorite" : ""} ${isFlipped ? "is-flipped" : ""}`}>
			<div className="tile-card">
				<div className="tile-inner">
					<div className="tile-face tile-front">
						<FigureImage amiibo={amiibo} alt="" className="tile-figure" />
						<IoInformationCircleOutline className="tile-hint" aria-hidden="true" />
					</div>

					<div className="tile-face tile-back" id={backId} aria-hidden={!isFlipped}>
						<dl>
							{amiibo.unlockedAt && (
								<div>
									<dt>{t("card.unlocked")}</dt>
									<dd>{formatUnlockedAt(amiibo.unlockedAt, locale)}</dd>
								</div>
							)}
							<div>
								<dt>{t("card.amiiboSeries")}</dt>
								<dd>{amiibo.amiiboSeries}</dd>
							</div>
							{REGIONS.map((key) => (
								<div key={key}>
									<dt>{t(`card.region.${key}`)}</dt>
									<dd className={amiibo.release?.[key] ? "" : "is-muted"}>
										{formatReleaseDate(amiibo.release?.[key], locale) ?? t("card.notReleased")}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>

				<button
					type="button"
					className="tile-flip"
					onClick={() => setIsFlipped((flipped) => !flipped)}
					aria-expanded={isFlipped}
					aria-controls={backId}
					aria-label={t("card.detailsFor", { name: amiibo.name })}
				/>

				<button
					type="button"
					className="tile-fav"
					onClick={() => toggleFavorite(amiibo)}
					aria-pressed={isFavorite}
					aria-label={t("card.favorite", { name: amiibo.name })}
					title={isFavorite ? t("card.removeFavorite") : t("card.addFavorite")}
				>
					{isFavorite ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
				</button>
			</div>

			<div className="tile-info">
				<h3 className="tile-name">{amiibo.name}</h3>
				<p className="tile-series">{amiibo.gameSeries}</p>
			</div>
		</li>
	);
};

export default AmiiboCard;
