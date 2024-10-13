const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  // './',
  // './index.html',
  // './style.css',
  // './test.webmanifest',
  // './assets/cone.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }).catch(function(err) {
      console.error('Failed to open cache or add resources to cache: ', err);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated');
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