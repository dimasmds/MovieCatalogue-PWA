const loadNav = () => {
    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status !== 200) return;
            document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                elm.innerHTML = xHttp.responseText;
            });
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                elm.addEventListener("click", function (event) {
                    let sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
                    let page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                })
            })
        }
    };
    xHttp.open("GET", "nav.html", true);
    xHttp.send();
}
const loadPage = page => {
    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            let content = document.querySelector("#body-content");
            if (this.status === 200) {
                content.innerHTML = xHttp.responseText;
                if (page === "now-playing") {
                    getNowPlayingMovies()
                } else if (page === "upcoming") {
                    getUpcomingMovies()
                } else if (page === "setting") {
                    initializeUI()
                }
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>"
            }
        }
    };
    xHttp.open("GET", "pages/" + page + ".html", true);
    xHttp.send();
};

document.addEventListener("DOMContentLoaded", function () {
    let elements = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elements);
    loadNav();

    let page = window.location.hash.substr(1);
    if (page === "") page = "now-playing";
    loadPage(page);
});