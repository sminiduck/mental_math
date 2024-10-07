const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/mental_math/',
  '/mental_math/index.html',
  '/mental_math/main.css',
  '/mental_math/cone.png',
  '/mental_math/manifest.json',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});