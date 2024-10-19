const CACHE_NAME = 'mm-cache-v20241019-111500';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './mathUtils.js',
  './app.webmanifest',
  './assets/cone.png',
];

self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
      self.skipWaiting(); // 새로운 서비스 워커를 즉시 활성화
  }
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).then(function() {
        // 캐시 추가가 완료된 후 skipWaiting 호출
        self.skipWaiting();
        console.log('Service worker skipWaiting called');
      });
    }).catch(function(err) {
      console.error('Failed to open cache or add resources to cache: ', err);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});


