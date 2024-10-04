const CACHE_NAME = "my-app-cache-v1";
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/js/bundle.js',
    '/styles.css',
    '/script.js',
    '/images/icon.png',
    '/favicon.ico',
    '/users',
    '/about',
];

// Install event - Cache static assets
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", event => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching static assets and pages.");
            return Promise.all(
                URLS_TO_CACHE.map(url => {
                    return cache.add(url).catch(error => {
                        console.error(`Failed to cache: ${url}`, error);
                    });
                })
            );
        }).then(() => {
            console.log('All resources cached successfully.');
        }).catch(error => {
            console.error('Cache installation failed:', error);
        })
    );
});

// Activate event - Clean up old caches
// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", event => {
    console.log('Service Worker activating.');
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
        }).then(() => {
            console.log('Old caches cleaned up.');
        })
    );
});

// Fetch event - Serve cached resources or fetch from network
// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", event => {
    console.log(`Fetching: ${event.request.url}`);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`Serving from cache: ${event.request.url}`);
                return response;
            }
            return fetch(event.request).then(fetchResponse => {
                // Check if we received a valid response
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                    return fetchResponse;
                }

                // Clone the response so we can cache it
                const responseToCache = fetchResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                    console.log(`Cached new resource: ${event.request.url}`);
                });
                return fetchResponse;
            });
        }).catch(error => {
            console.error('Fetch failed:', error);
            // Optionally return a fallback resource if available
        })
    );
});
