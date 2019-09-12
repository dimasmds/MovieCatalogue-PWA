const API_KEY = "4a6eac5979a646031dc1c7a3cd7a2697";
const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
const DEFAULT_LANGUAGE = "en-us";

const endpointNowPlaying = `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}&page=1`;
const endpointUpcoming = `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}&page=1`;
const endpointDetailMovie = `${BASE_URL}movie/`;

const logTAG = `[api-controller]`;

const loading = `
        <div class="center-align">
            <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

const fetchApi = url => {
    return fetch(url)
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

const getNowPlayingMovies = () => {
    let nowPlayingContainer = document.getElementById("now-playing-container");
    nowPlayingContainer.innerHTML = loading;
    fetchApi(endpointNowPlaying)
        .then(data => {
            nowPlayingContainer.innerHTML = "";
            data.results.forEach(movie => {
                dbSaveNowPlayingMovie(movie)
            });
            dbGetNowPlayingMovie().then(showNowPlayingMovie)
        }).catch(() => {
        isUpcomingCached().then(status => {
            if (status) {
                dbGetNowPlayingMovie().then(showNowPlayingMovie);
                console.log(`${logTAG} load from localDB`)
            }
        })
    })
};

const getUpcomingMovies = () => {
    let upcomingContainer = document.getElementById("upcoming-container");
    upcomingContainer.innerHTML = loading;
    fetchApi(endpointUpcoming)
        .then(data => {
            upcomingContainer.innerHTML = "";
            data.results.forEach(movie => {
                dbSaveUpcomingMovie(movie);
            });
            dbGetUpcomingMovie().then(showUpcomingMovies)
        }).catch(() => {
        isUpcomingCached().then(status => {
            if (status) {
                dbGetUpcomingMovie().then(showUpcomingMovies);
                console.log(`${logTAG} load from localDB`)
            }
        })
    })
};

const getDetailMovies = idMovie => {
    let container = document.getElementById("movie-container");
    container.innerHTML = loading;
    fetchApi(`${endpointDetailMovie}${idMovie}?api_key=${API_KEY}`)
        .then(data => {
            container.innerHTML = "";
            dbSaveDetailMovie(data)
                .then(status => {
                    if (status) {
                        showDetailMovie(data)
                    } else {
                        container.innerHTML = "<p>Ups Failed to load Data</p>";
                        console.log("Error get save data")
                    }
                })
        })
};





