const showNowPlayingMovie = data => {
    let content = "";
    data = data.reverse();
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
};

const showUpcomingMovies = data => {
    let content = "";
    data = data.reverse();
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
};

const showDetailMovie = data => {
    let containerContent =
        `<div class="row">
        <div class="col s12 m12">
            <div class="card">
                <div class="card-image">
                  <img src="${BASE_IMAGE_URL + data.backdrop_path}">
                </div>
                <div class="card-content">
                    <div class="flex-column">
                        <div class="flex-row">
                            <div>
                                <img class="image-poster" src="${BASE_IMAGE_URL + data.poster_path}">
                            </div>
                            <div>
                                <h5>${data.title}</h5>
                            <h6>${data.release_date}</h6>
                            <p>${data.production_companies[0].name}</p>
                            <br>
                            <h6>Popularity</h6>
                            <div>
                                <span><h5>${data.vote_average}</h5> from <strong>${data.vote_count} votes</strong> </span>
                            </div>
                            <br>
                            <h6>Duration</h6> 
                            <h5>${data.runtime} Minutes</h5>
                            </div>
                        </div>
                        <div>
                            <h5>Overview</h5>
                            <p id="movie-description">${data.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    document.getElementById("movie-container").innerHTML = containerContent;

    console.log(data);
};