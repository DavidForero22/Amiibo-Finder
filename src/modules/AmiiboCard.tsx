import React from "react";
import { IoHeart, IoHeartOutline, IoChevronDown } from "react-icons/io5";
import { useAmiibo, type Amiibo } from "../context/AmiiboContext";
import { formatUnlockedAt, formatReleaseDate } from "../logic/utils";
import FigureImage from "./FigureImage";
import "../styles/amiibo-card.css";

interface Props {
	amiibo: Amiibo;
}

/** Dates follow the UI language (English until the i18n workstream lands). */
const UI_LOCALE = "en";

const REGIONS:{ key: keyof Amiibo["release"]; label: string }[] = [
	{ key: "na", label: "North America" },
	{ key: "eu", label: "Europe" },
	{ key: "jp", label: "Japan" },
	{ key: "au", label: "Australia" },
];

/**
 * One figure in the ledger: a small display box with the figure on its plinth,
 * a favorite toggle, and a disclosure with unlock and release details.
 */
const AmiiboCard: React.FC<Props> = ({ amiibo }) => {
	const { toggleFavorite } = useAmiibo();
	const isFavorite = !!amiibo.isFavorite;

	return (
		<li className={`tile ${isFavorite ? "is-favorite" : ""}`}>
			<div className="tile-box">
				<FigureImage amiibo={amiibo} alt="" className="tile-figure" />
				<button
					type="button"
					className="tile-fav"
					onClick={() => toggleFavorite(amiibo)}
					aria-pressed={isFavorite}
					aria-label={`Favorite ${amiibo.name}`}
					title={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
					Details
					<IoChevronDown aria-hidden="true" />
				</summary>
				<dl>
					{amiibo.unlockedAt && (
						<div>
							<dt>Unlocked</dt>
							<dd>{formatUnlockedAt(amiibo.unlockedAt, UI_LOCALE)}</dd>
						</div>
					)}
					<div>
						<dt>Amiibo series</dt>
						<dd>{amiibo.amiiboSeries}</dd>
					</div>
					{REGIONS.map(({ key, label }) => (
						<div key={key}>
							<dt>{label}</dt>
							<dd className={amiibo.release?.[key] ? "" : "is-muted"}>
								{formatReleaseDate(amiibo.release?.[key], UI_LOCALE) ?? "Not released"}
							</dd>
						</div>
					))}
				</dl>
			</details>
		</li>
	);
};

export default AmiiboCard;
