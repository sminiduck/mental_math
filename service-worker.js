const now = new Date();
const formattedDate = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).format(now).replace(/[^\d]/g, '').replace(/(\d{8})(\d{6})/, '$1-$2');
const CACHE_NAME = 'mm-cache-v' + formattedDate;
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.webmanifest',
  './assets/cone.png'
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