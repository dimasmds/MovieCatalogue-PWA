const swSetup = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(swReg => {
            console.log('Service Worker Registered ', swReg);
            swRegistration = swReg;
        });
    } else {
        console.log('Failed to register service worker')
    }
};

swSetup();
