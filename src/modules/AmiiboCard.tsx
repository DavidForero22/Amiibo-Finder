import React from "react";
import { useTranslation } from "react-i18next";
import { IoHeart, IoHeartOutline, IoChevronDown } from "react-icons/io5";
import { useAmiibo, type Amiibo } from "../context/AmiiboContext";
import { formatUnlockedAt, formatReleaseDate } from "../logic/utils";
import FigureImage from "./FigureImage";
import "../styles/amiibo-card.css";

interface Props {
	amiibo: Amiibo;
}

const REGIONS = ["na", "eu", "jp", "au"] as const satisfies readonly (keyof Amiibo["release"])[];

/**
 * One figure in the ledger: a small display box with the figure on its plinth,
 * a favorite toggle, and a disclosure with unlock and release details.
 */
const AmiiboCard: React.FC<Props> = ({ amiibo }) => {
	const { t, i18n } = useTranslation();
	const { toggleFavorite } = useAmiibo();
	const isFavorite = !!amiibo.isFavorite;
	const locale = i18n.resolvedLanguage;

	return (
		<li className={`tile ${isFavorite ? "is-favorite" : ""}`}>
			<div className="tile-box">
				<FigureImage amiibo={amiibo} alt="" className="tile-figure" />
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

			<details className="tile-details">
				<summary>
					{t("card.details")}
					<IoChevronDown aria-hidden="true" />
				</summary>
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
			</details>
		</li>
	);
};

export default AmiiboCard;
