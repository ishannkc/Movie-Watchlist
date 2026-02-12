const inputEl = document.getElementById('search-input')

document.getElementById('search-btn').addEventListener('click', handleSearch)

const API_KEY = 'c7244e8d'

if(inputEl){
    inputEl.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter'){
            handleSearch()
        }
    })
}
async function handleSearch(){
        const res =  await fetch(`https://www.omdbapi.com/?t=${inputEl.value}&apikey=${API_KEY}`)
        const data = await  res.json()
        // console.log(data)
        document.getElementById('initial-state').classList.add('hidden')
        if(data.Response === 'False'){
            document.getElementById('movies-container').classList.add('hidden')
            document.getElementById('no-results-state').classList.remove('hidden')
        } else{
        document.getElementById('movies-container').classList.remove('hidden')
        document.getElementById('no-results-state').classList.add('hidden')
        document.getElementById('movies-container').innerHTML = `
                <div class="movie-card">
            <img class = "movie-poster" src="${data.Poster}" alt="${data.Title} Movie Poster">
                <h1 class = "movie-title" >${data.Title}</h1>
                <p class = "movie-rating">${data.imdbRating}</p>

            <p class = "movie-runtime">${data.Runtime}</p>
            <p class = "movie-genre">${data.Genre}</p>
            <a href="#" class="watchlist-btn" id = "add-watchlist">
                    <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    Watchlist
                </a>
            <p class = "movie-plot">${data.Plot}</p>
        </div>
        `
        }
    
}