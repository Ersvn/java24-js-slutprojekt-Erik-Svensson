const TMDB_API_KEY = "c68e81a17f2fccec2a8025501b3bff28";
const TMDB_BASE = "https://api.themoviedb.org/3";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";
const FALLBACK_IMG = "https://via.placeholder.com/342x513?text=No+Image";

export async function tmdb(path, params = {}) {
    const url = new URL(TMDB_BASE + path);
    url.searchParams.set("api_key", TMDB_API_KEY);
    url.searchParams.set("language", "sv-SE");

    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null && String(v).length) url.searchParams.set(k, v);
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("request_failed");
    return res.json();
}

function imgUrl(path) {
    return path ? IMG_BASE + path : FALLBACK_IMG;
}

function escapeHtml(s) {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function titleOf(x, kind) {
    return kind === "movie"
        ? String(x.title || x.name || "")
        : String(x.name || "");
}

function scoreOf(x, kind) {
    const v = kind === "movie" ? Number(x.vote_average) : Number(x.popularity);
    return Number.isFinite(v) ? v : 0;
}

function dateOfMovie(m) {
    return String(m.release_date || "Okänt datum");
}

export function sortedItems(items, kind, sortKey) {
    const arr = [...items];

    const byTitle = (a, b) =>
        titleOf(a, kind).toLocaleLowerCase("sv-SE").localeCompare(
            titleOf(b, kind).toLocaleLowerCase("sv-SE"),
            "sv-SE"
        );

    const byScore = (a, b) => scoreOf(a, kind) - scoreOf(b, kind);

    if (sortKey === "title_asc") return arr.sort(byTitle);
    if (sortKey === "title_desc") return arr.sort(byTitle).reverse();
    if (sortKey === "score_asc") return arr.sort(byScore);
    if (sortKey === "score_desc") return arr.sort(byScore).reverse();
    return arr;
}

export function renderResults({ items, kind, showOverview, sortKey, resultsEl }) {
    const sorted = sortedItems(items, kind, sortKey);

    resultsEl.innerHTML = sorted.map((x) => {
        if (kind === "movie") {
            const desc = showOverview
                ? `<p class="desc">${escapeHtml(x.overview || "Ingen beskrivning.")}</p>`
                : "";

            return `
        <article class="card">
          <img src="${imgUrl(x.poster_path)}" alt="">
          <div class="pad">
            <strong>${escapeHtml(titleOf(x, "movie"))}</strong>
            <div class="meta">Release date: ${escapeHtml(dateOfMovie(x))}</div>
            <div class="meta">Average score: ${scoreOf(x, "movie").toFixed(1)}</div>
            ${desc}
          </div>
        </article>
      `;
        }

        const dept = x.known_for_department || "Okänt";
        const knownFor = Array.isArray(x.known_for) ? x.known_for : [];

        const knownList = knownFor.length
            ? knownFor.map((k) => {
                const type = k.media_type === "movie" ? "Movie" : "TV";
                const t = k.title || k.name || "Okänd titel";
                return `<div><span class="badge">${type}</span>${escapeHtml(t)}</div>`;
            }).join("")
            : `<div class="meta">Inget att visa.</div>`;

        return `
      <article class="card">
        <img src="${imgUrl(x.profile_path)}" alt="">
        <div class="pad">
          <strong>${escapeHtml(titleOf(x, "person"))}</strong>
          <div class="meta">Avdelning: ${escapeHtml(dept)}</div>
          <div class="meta">Popularity: ${scoreOf(x, "person").toFixed(1)}</div>
          ${knownList}
        </div>
      </article>
    `;
    }).join("");
}