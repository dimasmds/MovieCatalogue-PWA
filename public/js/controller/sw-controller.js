const requestPermission = () => {
    Notification.requestPermission().then(function (result) {
        if(result === "denied") {
            console.log(`[Notification] Fitur notifikasi tidak diijinkan`)
        } else if(result === "default") {
            console.log(`[Notification] Pengguna menutup permission`)
        } else {
            console.log(`[Notification] Diijinkan`)
        }
    })
};

const swSetup = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(swReg => {
            console.log('Service Worker Registered ', swReg);
            swRegistration = swReg;

            if("Notification" in window) {
                requestPermission()
            } else {
                console.log(`[Notification] Browser ini tidak mendukung notifikasi`)
            }
        });
    } else {
        console.log('Failed to register service worker')
    }
};

swSetup();
