document.addEventListener("DOMContentLoaded", function () {
    var elemens = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elemens);
    loadNav();

    var page = window.location.hash.substr(1);
    if (page === "") page = "now-playing";
    loadPage(page);

    function loadNav() {
        var xHttp = new XMLHttpRequest();
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xHttp.responseText;
                });
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })
            }
        };
        xHttp.open("GET", "nav.html", true);
        xHttp.send();
    }

    function loadPage(page) {
        let xHttp = new XMLHttpRequest();
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xHttp.responseText;
                    if (page === "now-playing") {
                        getNowPlayingMovies()
                    } else if (page === "upcoming") {
                        getUpcomingMovies()
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
    }
});