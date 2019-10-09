const idbPromised = idb.open('movie-catalogue', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('upcoming')) {
        let upcomingObject = upgradeDb.createObjectStore("upcoming", {keyPath: "id"});
        upcomingObject.createIndex('by-id', 'id')
    }

    if (!upgradeDb.objectStoreNames.contains('now-playing')) {
        let nowPlayingObject = upgradeDb.createObjectStore("now-playing", {keyPath: "id"});
        nowPlayingObject.createIndex('by-id', 'id');
    }

    if (!upgradeDb.objectStoreNames.contains('movie-detail')) {
        let movieDetailObject = upgradeDb.createObjectStore("movie-detail", {keyPath: "id"});
        movieDetailObject.createIndex("by-id", "id", {unique: true})
    }

    if (!upgradeDb.objectStoreNames.contains('movie-favorite')) {
        let movieFavoriteObject = upgradeDb.createObjectStore("movie-favorite", {keyPath: "id"});
        movieFavoriteObject.createIndex("by-id", "id", {unique: true})
    }
});

const dbSaveUpcomingMovie = data => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("upcoming", `readwrite`);
            transaction.objectStore("upcoming").put(data);
            return transaction
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbSaveNowPlayingMovie = data => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("now-playing", `readwrite`);
            transaction.objectStore("now-playing").put(data);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbSaveDetailMovie = data => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("movie-detail", `readwrite`);
            transaction.objectStore("movie-detail").put(data);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbGetNowPlayingMovie = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("now-playing", `readonly`);
            return transaction.objectStore("now-playing").getAll()
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Data not found"))
            }
        })
    })
};

const dbGetUpcomingMovie = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("upcoming", `readonly`);
            return transaction.objectStore("upcoming").getAll()
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Data not found"))
            }
        })
    })
};

const dbGetDetailMovie = idMovie => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("movie-detail", `readonly`);
            return transaction.objectStore("movie-detail").get(idMovie)
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Data not found"))
            }
        })
    })
};

const isNowPlayingCache = () => {
    return new Promise(resolve => {
        idbPromised.then(db => {
            const transaction = db.transaction("now-playing", `readonly`);
            return transaction.objectStore("now-playing").getAll()
        }).then(data => {
            if (data.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

const isUpcomingCached = () => {
    return new Promise(resolve => {
        idbPromised.then(db => {
            const transaction = db.transaction("upcoming", `readonly`);
            return transaction.objectStore("upcoming").getAll();
        }).then(data => {
            if (data.length > 0) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
};

const isMovieFavorited = (idMovie) => {
    return new Promise((resolve) => {
        idbPromised.then(db => {
            const transaction = db.transaction("movie-favorite", `readonly`);
            return transaction.objectStore("movie-favorite").get(idMovie)
        }).then(data => {
            if (data !== undefined) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    });
};

const dbInsertFavorite = movie => {
    console.log("[Insert] ", movie);
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("movie-favorite", `readwrite`);
            transaction.objectStore("movie-favorite").add(movie);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbDeleteFavorite = movieId => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("movie-favorite", `readwrite`);
            transaction.objectStore("movie-favorite").delete(movieId);
            return transaction;
        }).then(transaction => {
            if (transaction.success) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbGetAllFavorite = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("movie-favorite", `readonly`);
            return transaction.objectStore("movie-favorite").getAll();
        }).then(data => {
            if(data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};