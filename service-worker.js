self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          'icon-192x192.png',
          'icon-512x512.png'
        ]);
      })
    );
});
  