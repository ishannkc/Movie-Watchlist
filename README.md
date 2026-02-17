## Movie Watchlist
![Search Page Preview](img/search-preview.png)
![Watchlist Page Preview](img/watchlist-preview.png)
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
To use your own OMDb API key without exposing it in version control:

1. Get an API key from [OMDb](https://www.omdbapi.com/apikey.aspx).
2. In the project root, create a file named `.config.js` (do not include it in git).
3. Add the following line to `.config.js`:

	```js
	export const API_KEY = 'YOUR_OMDB_API_KEY';
	```

4. Save the file. The app will now import your key from `.config.js`.

**Note:** `.config.js` is already listed in `.gitignore` so it will not be committed.

### Project Structure
- [index.html](index.html) - Search page UI
- [watchlist.html](watchlist.html) - Watchlist page UI
- [index.js](index.js) - App logic (search, add/remove, localStorage)
- [index.css](index.css) - Global styles
- [.config.example.js](.config.example.js) - API key template (copy to .config.js)
- .config.js - Local API key (git-ignored)
- img/ - Assets used by the UI

### Usage Notes
- The watchlist is stored in the browser via localStorage, so it is device/browser specific.
- Searches are title-based and use the OMDb `t` query parameter (exact or close matches).

### Credits
- Data provided by the [OMDb API](https://www.omdbapi.com/).
