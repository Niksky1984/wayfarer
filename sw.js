/* Wayfarer Service Worker
   Caches the app shell so it works fully offline after first load.
   Bump CACHE_VERSION whenever you push an update so users get fresh files. */

const CACHE_VERSION = 'wayfarer-v8';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

// Pre-cache app shell on install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(APP_SHELL).catch(err => {
        console.warn('Pre-cache failed for some assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Clear old caches on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
//   - For navigation (HTML): network-first with cache fallback (so users get
//     updates fast when online but the app still loads offline).
//   - For other resources: cache-first (fonts, icons, manifest).
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Never intercept cross-origin requests we didn't pre-cache
  // (e.g. the Google Fonts API), so the browser handles them normally.
  if (url.origin !== location.origin) return;

  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then(res => {
          // update cache in background
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(()=>{});
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // cache successful same-origin responses for next time
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(()=>{});
        }
        return res;
      }).catch(() => undefined);
    })
  );
});
