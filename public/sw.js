const CACHE_NAME = "react-pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/static/js/bundle.js",
    "/static/js/main.chunk.js",
    "/static/js/0.chunk.js",
    "/static/css/main.chunk.css",
    "/users"
];

// Install event: Cache resources
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );

    this.skipWaiting();
});

// Fetch event: Serve cached content when offline
this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // Fallback to network if not cached
                // return fetch(event.request).catch(() => {
                //     // You can define a fallback page here if the request fails
                //     return caches.match("/offline.html");
                // });

                let requestUrl = event.request.clone();
                return fetch(requestUrl)
            })
        );
    }

});

// Activate event: Cleanup old caches
this.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});
