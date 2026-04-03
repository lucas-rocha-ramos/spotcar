const CACHE_NAME = 'carplay-box-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './lucide.min.js' // Agora os ícones também ficam salvos no aparelho
];

// Instala e força o cache imediato
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta os pedidos para rodar sem internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se tiver, senão tenta a rede
        return response || fetch(event.request);
      })
  );
});

// Limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
