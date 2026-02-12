## Movie Watchlist



A simple, responsive movie search and watchlist app that uses the OMDb API. Search by title, view basic details, and save favorites to a local watchlist.

### Features
- Search movies by title via the OMDb API
- View poster, rating, runtime, genre, and plot
- Add movies to a persistent watchlist (stored in localStorage)
- Remove movies from the watchlist
- Separate watchlist page with empty-state UI

### Tech Stack
- HTML, CSS, JavaScript (vanilla)
- OMDb API

### Getting Started
1. Clone or download this repository.
2. Open [index.html](index.html) in your browser.
3. Search for a movie title and add it to your watchlist.

### Configuration
This project uses a hard-coded OMDb API key in [index.js](index.js). If you want to use your own key:
1. Get an API key from [OMDb](https://www.omdbapi.com/apikey.aspx).
2. Replace the value of `API_KEY` in [index.js](index.js).

### Project Structure
- [index.html](index.html) - Search page UI
- [watchlist.html](watchlist.html) - Watchlist page UI
- [index.js](index.js) - App logic (search, add/remove, localStorage)
- [index.css](index.css) - Global styles
- img/ - Assets used by the UI

### Usage Notes
- The watchlist is stored in the browser via localStorage, so it is device/browser specific.
- Searches are title-based and use the OMDb `t` query parameter (exact or close matches).

### Credits
- Data provided by the [OMDb API](https://www.omdbapi.com/).
