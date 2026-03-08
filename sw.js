const CACHE_NAME = 'study-eye-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './localforage.min.js',
  './Stats.min.js',
  './study.or.kill.mp3',
  './pls.study.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
