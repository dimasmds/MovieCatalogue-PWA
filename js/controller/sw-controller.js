const swSetup = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker Registered')
    } else {
        console.log('Failed to register service worker')
    }
};

swSetup();
