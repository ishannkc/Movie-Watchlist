import { API_KEY } from "./config.js";

const searchBtn = document.getElementById('search-btn');
const inputValue = document.getElementById('search-input')
const moviesContainer = document.getElementById('movies-container')

 async function handleSearch(){
    const res = await fetch(`https://www.omdbapi.com/?t=${inputValue.value}&apikey=${API_KEY}`)
    const data = await res.json()
    console.log(`fetched movie`,data)
    document.getElementById('initial-state').classList.add('hidden')
    if(data.Response === 'False'){
        document.getElementById('no-results-state').classList.remove('hidden')
        moviesContainer.classList.add('hidden')
    }else{
         moviesContainer.classList.remove('hidden')
         document.getElementById('no-results-state').classList.add('hidden')
        moviesContainer.innerHTML = `
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
        const watchListBtn = document.getElementById('add-watchlist')

        if (isInWatchlist(data.Title)) {
            watchListBtn.classList.add('added')
            watchListBtn.textContent = 'Added'
            watchListBtn.setAttribute('aria-disabled', 'true')
        } else {
            watchListBtn.addEventListener('click', (e) => {
                e.preventDefault()
                addtoLocalStorage(
                    data.Poster, data.Title, data.imdbRating, data.Runtime, data.Genre, data.Plot
                )
                watchListBtn.classList.add('added')
                watchListBtn.textContent = 'Added'
                watchListBtn.setAttribute('aria-disabled', 'true')
            })
        }
    }
        
}

let watchlist

 function isInWatchlist(title){
    if(localStorage.getItem('watchlist')){
        watchlist = JSON.parse(localStorage.getItem('watchlist'))
    } else{
        watchlist = []
    }

    return watchlist.some(function(movie){ //.some returns true if any element matches
        return movie.title === title //if title is same
    })
}



function addtoLocalStorage(image, title, rating, runtime, genre, plot){

    if(localStorage.getItem('watchlist')) //we have a watchlist already, so add a new watchlist in that
    {
        watchlist = JSON.parse(localStorage.getItem('watchlist')) 
    } else{
        watchlist = []
    }

    if(isInWatchlist(title)){
        console.log(`Is already in added`)
    } else{
    watchlist.push({
        image,
        title,
        rating,
        runtime,
        genre,
        plot
    })

    localStorage.setItem('watchlist', JSON.stringify(watchlist)) // add to localStorage
    }
    console.log(`Added to watchlist`, watchlist)
}

if(searchBtn){ //since we are putting 2 html pages in a single js file, and the searchBtn element might not exist for another html page(watchlist.html), 
    //so if(elementId) not added when a single js file runs multiple html pages, then there might be bugs
searchBtn.addEventListener('click', handleSearch)
}

if(inputValue){
inputValue.addEventListener('keypress', (e) => { // Search button will trigger when pressed Enter key
    if(e.key === 'Enter'){
        handleSearch()
    }
})
}
//watchlist part
const watchlistLink = document.getElementById('watchlist-link')


// No need to handle click event for watchlistLink if it has href
if(window.location.pathname.includes('watchlist.html')){ //if the pathname includes watchlist.html, then we get the watchlist
        handleWatchlist()
    }

function handleWatchlist(){
       if(localStorage.getItem(`watchlist`)){
        watchlist = JSON.parse(localStorage.getItem('watchlist'))
       } else{
        watchlist = []
       } 

       if(watchlist.length === 0){
        console.log('empty')
       } else{
        console.log(`watchlist ma `, watchlist)
        document.getElementById('watchlist-container').classList.remove('hidden') 
        document.getElementById('empty-watchlist-state').classList.add('hidden') 

        document.getElementById('watchlist-container').innerHTML = 
        //here watchlist is an array now instead of object so we have to render each and then join
        watchlist.map((movie, index) => ` <div class="movie-card"> 
            <img class = "movie-poster" src="${movie.image}" alt="${movie.title} Movie Poster">
                <h1 class = "movie-title" >${movie.title}</h1>
                <p class = "movie-rating">${movie.rating}</p>

            <p class = "movie-runtime">${movie.runtime}</p>
            <p class = "movie-genre">${movie.genre}</p>
            <a href="#" class="remove-btn">
                    <svg data-index = "${index}" class="remove-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                        Remove
                </a>
            <p class = "movie-plot">${movie.plot}</p>
        </div>`).join('')

            document.getElementById('watchlist-container').addEventListener('click', (e)=>{
                if(!e.target.classList.contains('remove-btn')){ //if remove-btn isn't in the watchlist container, then abort
                    return
                }

                e.preventDefault()

                const index = e.target.dataset.index //points to the index of the watchlist card

                watchlist.splice(index, 1) // .splice(which item, how many)
                localStorage.setItem('watchlist', JSON.stringify(watchlist)) //save updated watchlist after removal

                handleWatchlist() //re-render
                location.reload() //reload so that card renders perfectly
            })
    

    }
}