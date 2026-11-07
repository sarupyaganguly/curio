// Curio service worker: caches the whole app so it works fully offline.
// Bump VERSION whenever any app file or the content changes so phones pick up the update.
const VERSION = 'curio-v1';
const FILES = [
  './', 'index.html', 'styles.css', 'fonts.css', 'manifest.webmanifest',
  'js/app.js', 'data/ideas.js',
  'fonts/inter-normal.woff2', 'fonts/newsreader-normal.woff2', 'fonts/newsreader-italic.woff2',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Stale-while-revalidate: instant from cache, quietly refresh in the background when online.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
