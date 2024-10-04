export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered: ", registration);

        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed but waiting to activate');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      })
      .catch((error) => {
        console.error("Error registering the Service Worker: ", error);
      });
  }
};
