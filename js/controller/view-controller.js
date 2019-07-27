function showNowPlayingMovie(data) {
    let content = "";
    data.forEach(function (movie) {
        content += `
        <div class="card">
                <div class="card-image">
                    <img alt="${movie.title}" src="${BASE_IMAGE_URL + movie.backdrop_path}">
                    <div class="card-rating">
                        <span class="rating">⭐ ${movie.vote_average}</span> <span class="voter">(${movie.vote_count} Votes)</span>
                    </div>
                </div>
                <div class="card-content">
                    <a href="/detail.html?id=${movie.id}"><span class="card-title">${movie.title}</span></a>
                    <p class="text-ellipsis">${movie.overview}</p>
                </div>
            </div>
        `
    });
    let nowPlayingContainer = document.getElementById("now-playing-container");
    nowPlayingContainer.innerHTML = content
}

function showUpcomingMovies(data) {
    let content = "";
    data.forEach(function (movie) {
        content += `
        <div class="card">
                <div class="card-image">
                    <img alt="${movie.title}" src="${BASE_IMAGE_URL + movie.backdrop_path}">
                    <div class="card-rating">
                        <span class="rating">⭐ ${movie.vote_average}</span> <span class="vote">(${movie.vote_count} Votes)</span>
                    </div>
                </div>
                <div class="card-content">
                    <a href="/detail.html?id=${movie.id}"><span class="card-title">${movie.title}</span></a>
                    <p class="text-ellipsis">${movie.overview}</p>
                </div>
            </div>
        `
    });
    let nowPlayingContainer = document.getElementById("upcoming-container");
    nowPlayingContainer.innerHTML = content;
}

const showDetailMovie = data => {
    console.log(data);
};