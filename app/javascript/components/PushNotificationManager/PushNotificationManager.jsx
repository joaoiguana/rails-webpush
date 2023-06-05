import { useEffect } from 'react';

// This is the same helper function from earlier to convert your VAPID public key
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const PushNotificationManager = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);

            const subscribeOptions = {
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                'BEl62iUYgUivxIkv69yViU3A4 / sKsZxI3xRJIO / HPETPZM5ZK / CL2FEz / MCpSVGxIV2N5cu0R'
              )
            };

            return registration.pushManager.subscribe(subscribeOptions);
          })
          .then(pushSubscription => {
            console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
            return pushSubscription;
          })
          .catch(err => console.log('Service Worker registration failed: ', err));
      });
    }
  }, []);

  return null;
};

export default PushNotificationManager;
