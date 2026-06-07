// ===== localStorage helpers (same key as index.js so the two pages share data) =====
function getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist')) || []
}

function saveWatchlist(list) {
    localStorage.setItem('watchlist', JSON.stringify(list))
}

// ===== Render the saved movies =====
function renderWatchlist() {
    const watchlist = getWatchlist()
    const container = document.getElementById('movies-container')

    if (watchlist.length === 0) {
        document.querySelector('.empty-search').classList.remove('hidden')
        container.innerHTML = ""
        return
    }

    document.querySelector('.empty-search').classList.add('hidden')

    let moviesHtml = ""
    for (let movie of watchlist) {
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
                                <button class="remove-btn" data-imdbid="${movie.imdbID}">
                                    <i class="fa-solid fa-circle-minus"></i> Remove
                                </button>
                            </div>
                            <p id="plot"> ${movie.Plot} </p>
                        </div>
                    </div>`
    }
    container.innerHTML = moviesHtml
}

// ===== Remove from watchlist (event delegation) =====
document.getElementById('movies-container').addEventListener('click', function(e) {
    const btn = e.target.closest('.remove-btn')
    if (!btn) return

    // show feedback, then re-render (which drops the card) a moment later
    const id = btn.dataset.imdbid
    btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Removed`
    btn.disabled = true
    setTimeout(() => removeFromWatchlist(id), 600)
})

function removeFromWatchlist(id) {
    const watchlist = getWatchlist().filter(movie => movie.imdbID !== id)
    saveWatchlist(watchlist)
    renderWatchlist()   // re-draw so the removed card disappears
}

// ===== Show the saved movies as soon as the page loads =====
renderWatchlist()
