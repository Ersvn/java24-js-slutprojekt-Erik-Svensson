import { tmdb, renderResults } from "./lib.js";

const homeBtn = document.getElementById("homeBtn");
const topRatedBtn = document.getElementById("topRatedBtn");
const popularBtn = document.getElementById("popularBtn");

const searchForm = document.getElementById("searchForm");
const queryEl = document.getElementById("query");
const searchTypeEl = document.getElementById("searchType");
const sortEl = document.getElementById("sort");

const messageEl = document.getElementById("message");
const errorEl = document.getElementById("error");
const resultsEl = document.getElementById("results");

let currentKind = "movie";
let currentMode = "home";
let currentItems = [];
let showOverview = false;

// Statusfunktion
function setStatus({ message = "", error = "" } = {}) {
    messageEl.textContent = message;
    errorEl.textContent = error;
}

function showHome() {
    currentKind = "movie";
    currentMode = "home";
    currentItems = [];
    showOverview = false;

    setStatus();
    resultsEl.innerHTML = `
    <div class="home">
      <h2><strong>Välkommen!</strong></h2>
      <p><strong>Här kan du se Top rated och Popular filmer just nu, eller söka på en film eller person.</strong></p>
      <p> Prova skriva in "Gladiator" eller "Russell Crowe". Glöm inte filtrera mellan 'film' och 'person'.</p>
    </div>
  `;
}

function render() {
    if (currentMode === "home") return;

    renderResults({
        items: currentItems,
        kind: currentKind,
        showOverview,
        sortKey: sortEl.value,
        resultsEl
    });
}

async function loadList(endpoint, loadingText) {
    setStatus({ message: loadingText, error: "" });

    try {
        const data = await tmdb(endpoint, { page: 1 });
        currentKind = "movie";
        currentMode = "list";
        showOverview = false;
        currentItems = (data.results || []).slice(0, 25);

        setStatus();
        if (currentItems.length === 0) setStatus({ error: "Inga filmer hittades." });
        render();
    } catch {
        setStatus({ error: "Något gick fel. Försök igen senare." });
    }
}

async function doSearch() {
    const q = queryEl.value.trim();
    const type = searchTypeEl.value;

    if (!q) {
        showHome();
        return;
    }

    setStatus({ message: "Söker…", error: "" });

    try {
        if (type === "movie") {
            const data = await tmdb("/search/movie", { query: q, page: 1, include_adult: false });
            currentKind = "movie";
            currentMode = "search";
            showOverview = true;
            currentItems = data.results || [];
        } else {
            const data = await tmdb("/search/person", { query: q, page: 1, include_adult: false });
            currentKind = "person";
            currentMode = "search";
            showOverview = false;
            currentItems = data.results || [];
        }

        setStatus();
        if (currentItems.length === 0) {
            setStatus({ error: "Inga sökresultat. Prova en annan sökning." });
        }
        render();
    } catch {
        setStatus({ error: "Något gick fel. Försök igen senare." });
    }
}

// Events
homeBtn.addEventListener("click", showHome);

topRatedBtn.addEventListener("click", () =>
    loadList("/movie/top_rated", "Hämtar Top rated…")
);

popularBtn.addEventListener("click", () =>
    loadList("/movie/popular", "Hämtar Popular…")
);

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    doSearch();
});

sortEl.addEventListener("change", () => {
    if (currentItems.length) render();
});

showHome();

// 1. Vad har varit roligast med projektet?
// 2. Vad har varit svårast med koden? Var specifik och visa i koden hur du löste det.
// 3. Om du skulle utveckla ett liknande projekt igen, vad skulle du göra annorlunda i processen?