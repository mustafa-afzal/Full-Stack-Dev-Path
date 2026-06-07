// ===== localStorage helpers =====
function getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist')) || []
}

function saveWatchlist(list) {
    localStorage.setItem('watchlist', JSON.stringify(list))
}

// Keeps the most recent search results so we can look a movie up by id when adding
let currentMovies = []

// ===== Search =====
document.getElementById('submit').addEventListener('click', function() {
    fetch(`https://www.omdbapi.com/?apikey=aa197ec1&s=${document.getElementById('search-bar').value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                document.getElementById('empty-search').classList.remove('hidden')
                document.getElementById('empty-search').innerHTML = `
                    <h2> Unable to find what you're looking for.
                    Please try another search </h2>`
                document.getElementById('movies-container').innerHTML = ""
                return []
            }
            const detailPromises = data.Search.map(movie =>
                fetch(`https://www.omdbapi.com/?apikey=aa197ec1&i=${movie.imdbID}`)
                    .then(res => res.json())
            )
            return Promise.all(detailPromises)
        })
        .then(moviesWithDetails => {
            currentMovies = moviesWithDetails
            renderMovies(moviesWithDetails)
        })
})

function renderMovies(movies) {
    if (movies.length === 0) return
    document.querySelector('.empty-search').classList.add('hidden')

    const watchlist = getWatchlist()
    let moviesHtml = ""
    for (let movie of movies) {
        const inWatchlist = watchlist.some(m => m.imdbID === movie.imdbID)
        moviesHtml += `
                    <div class="movie-card">
                        <img src="${movie.Poster}" alt="${movie.Title} poster">
                        <div class="movie-content">
                            <div class="movie-header">
                                <h3> ${movie.Title} </h3>
                                <p class="rating"> <i class="fa-solid fa-star" style="color: #FEC654;"></i> ${movie.imdbRating} </p>
                            </div>
                            <div class="movie-info">
                                <h5> ${movie.Runtime} </h5>
                                <h5 class="genre"> ${movie.Genre} </h5>
                                <button class="watchlist-btn" data-imdbid="${movie.imdbID}" ${inWatchlist ? "disabled" : ""}>
                                    <i class="fa-solid ${inWatchlist ? "fa-circle-check" : "fa-circle-plus"}"></i> ${inWatchlist ? "Added" : "Watchlist"}
                                </button>
                            </div>
                            <p id="plot"> ${movie.Plot} </p>
                        </div>
                    </div>`
    }
    document.getElementById('movies-container').innerHTML = moviesHtml
}

// ===== Add to watchlist (event delegation) =====
document.getElementById('movies-container').addEventListener('click', function(e) {
    const btn = e.target.closest('.watchlist-btn')
    if (!btn) return

    const added = addToWatchlist(btn.dataset.imdbid)
    if (added) {
        btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Added`
        btn.disabled = true
    }
})

function addToWatchlist(id) {
    const watchlist = getWatchlist()

    if (watchlist.some(movie => movie.imdbID === id)) return false   // already saved

    const movie = currentMovies.find(m => m.imdbID === id)
    watchlist.push(movie)
    saveWatchlist(watchlist)
    return true
}

