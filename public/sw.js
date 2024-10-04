const CACHE_NAME = "my-app-cache-v1";
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    "/manifest.json",
    "/static/js/bundle.js",
    '/styles.css',
    '/script.js',
    '/images/icon.png',
    '/favicon.ico',
    "/users",
    "/about",
];

this.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching static assets and pages.");
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

this.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

this.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        }).catch(() => {

        })
    );
});

