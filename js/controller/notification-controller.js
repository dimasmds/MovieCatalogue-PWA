const applicationServerPublicKey = 'BEfNGSGU3ARkp2yb2aNCoKchlnA9zjLtcA4p2kMIwAUC1kVxZ6QORpd_Zb2jQkQCnZbrHuxHpcebyh-PsakrvMc';
let isSubscribed = null;

const updateButton = () => {
    if (isSubscribed) {
        pushButton.textContent = 'Disable Notification'
    } else {
        pushButton.textContent = 'Enable Notification'
    }
    pushButton.disabled = false
};

const subscribeUser = () => {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then(subscription => {
        console.log('User is subscribed', subscription);
        endpointText.textContent = JSON.stringify(subscription);
        isSubscribed = true;
        updateButton()
    }).catch(error => {
        console.log('Failed to subscribe the user: ', error)
        updateButton()
    })
};

const unsubscribeUser = () => {
    swRegistration.pushManager.getSubscription().then(subscription => {
        if (subscription) {
            return subscription.unsubscribe()
        }
    }).catch(error => {
        console.log("Error unsubscribing", error)
    }).then(() => {
        console.log('User is unsubscribed');
        isSubscribed = false;
        updateButton()
    })
};

const requestPermission = () => {
    if ("Notification" in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log(`[Notification] Fitur notifikasi tidak diijinkan`)
            } else if (result === "default") {
                console.log(`[Notification] Pengguna menutup permission`)
            } else {
                console.log(`[Notification] Diijinkan`)
                subscribeUser();
            }
        })
    } else {
        console.log(`[Notification] Browser ini tidak mendukung notifikasi`);
    }
};



const initializeUI = () => {
    pushButton = document.getElementById('buttonNotification');
    endpointText = document.getElementById('endpointText');

    pushButton.addEventListener('click', () => {
        pushButton.disabled = true;
        if (isSubscribed) {
            unsubscribeUser()
        } else {
            requestPermission();
        }
    });

    swRegistration.pushManager.getSubscription().then(subscription => {
        console.log(`[Notification] `, subscription);
        isSubscribed = !(subscription === null);
        if (isSubscribed) {
            console.log('User is Subscribed')
        } else {
            console.log('User is NOT Subscribed');
        }
    });
    updateButton()
};

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}