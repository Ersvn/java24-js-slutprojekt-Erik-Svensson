# java24-js-slutprojekt-Erik-Svensson

| DEL 1 — lib.js | DEL 2 — main.js |
|----------------|------------------|
| **Överblick**<br>API<br>Sortering<br>Rendering | **Överblick**<br>Knappar<br>Form<br>State<br>API<br>Rendering |
| **Konstanter**<br>API_KEY<br>BASE<br>IMG<br>Fallback<br><br>👉 Samlar konstanter överst | **Import**<br>tmdb<br>renderResults<br><br>👉 Delar upp ansvar |
| **tmdb()**<br>URL<br>api_key<br>språk<br>params<br>fetch<br>error<br><br>👉 Generell API-funktion | **DOM**<br>knappar<br>inputs<br>results<br><br>👉 Sparar element |
| **imgUrl()**<br>bild/fallback<br><br>👉 Layout bryts ej | **State**<br>kind<br>mode<br>items<br>overview<br><br>👉 Håller koll på vy |
| **escapeHtml()**<br>säker text<br><br>👉 Undviker HTML-tolkning | **setStatus()**<br>loading/error<br><br>👉 En funktion |
| **titleOf / scoreOf**<br>normaliserar typer<br><br>👉 Samma logik | **showHome()**<br>reset<br>starttext<br><br>👉 Startläge |
| **sortedItems()**<br>kopierar<br>sort titel<br>sort score<br><br>👉 Original ändras ej | **render()**<br>skickar state<br><br>👉 Visar lista |
| **renderResults()**<br>sort → map → kort<br>film/person layout<br><br>👉 Visar data | **loadList()**<br>API<br>Top10<br><br>👉 slice(0,10) |
| **Film visar**<br>bild<br>titel<br>datum<br>score<br>overview | **doSearch()**<br>input<br>typ<br>page1<br>resultat |
| **Person visar**<br>bild<br>namn<br>dept<br>popularity<br>verk | **Events**<br>click<br>submit<br>sort<br><br>👉 UI → logik |
| **Slutpoäng**<br>Separerar data/logik/UI | **Start**<br>showHome() |

---

## Frågor

| Fråga 1 | Fråga 2 |
|--------|---------|
| API + riktig data<br>Sök fungerade<br>Allt kopplades ihop<br>Sortering kul | Olika datastruktur<br>Samma render<br>State-logik<br>Sort utan API |

| Lösning | Fråga 3 |
|--------|---------|
| titleOf()<br>scoreOf()<br>currentItems<br>render() | Planera först<br>Skissa flöde<br>Testa oftare<br>Fler commits |