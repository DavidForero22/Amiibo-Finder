import type { Amiibo } from "../context/AmiiboContext";
import AmiiboCard from "./AmiiboCard";

interface Props {
    amiibos: Amiibo[];
    /** id of the heading that names this list */
    labelledBy: string;
}

/** The ledger grid of owned figures. */
const AmiiboList = ({ amiibos, labelledBy }: Props) => (
    // role="list" keeps list semantics in Safari/VoiceOver despite `list-style: none`
    <ul className="ledger-grid" role="list" aria-labelledby={labelledBy}>
        {amiibos.map((amiibo) => (
            <AmiiboCard key={amiibo.head + amiibo.tail} amiibo={amiibo} />
        ))}
    </ul>
);

export default AmiiboList;
