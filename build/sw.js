const CACHE_NAME = 'msb-cache';
const urlsToCache = [
  './bad.webp',
  './bag.svg',
  './bagheader.svg',
  './blackBag.svg',
  './card.svg',
  './chair.webp',
  './chat.svg',
  './cubins.webp',
  './discount.svg',
  './emptyCubins.webp',
  './filter.webp',
  './fiveStars.webp',
  './Group.svg',
  './GroupMedia.svg',
  './log.svg',
  './logout.svg',
  './menu.webp',
  './money.svg',
  './order.svg',
  './paperImg.svg',
  './paperImgred.svg',
  './people.svg',
  './peopleCard.svg',
  './search.svg',
  './services.svg',
  './index.html',
  './table.webp',
  './tick.svg',
  './transportiration.webp',
  './trash.svg',
  './userIcon.svg',
  './userWhite.png'
];

// './static/js/main.0f51f24f.js',
// './static/css/main.ca0ade7c.css',
// './static/media/Inter-Regular.a3e5baa244e35d0f891d.ttf',
// './static/media/Inter-Light.a6cdc9ac687f817dbfb5.ttf',
// './static/media/Inter-Bold.1eca2d329458b92342aa.ttf',
// './static/media/Furore.7c2d24435f6f4ca0152e.otf',

self.addEventListener('install', (event)=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>{return cache.addAll(urlsToCache);}));
});
self.addEventListener('activate', (event)=>{
    const cacheWhitelist = ['page-1', 'page-2'];
    event.waitUntil(
      caches.keys().then((cacheNames)=> {
        return Promise.all(
          cacheNames.map((cacheName)=> {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});
self.addEventListener('fetch', (event)=> {
    event.respondWith(
      caches.match(event.request).then((response)=> {
          if (response) {
            return response;
          }
          const fetchRequest = event.request.clone();
          return fetch(fetchRequest).then((response)=> {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache)=> {
                  cache.put(event.request, responseToCache);
                });
              return response;
            }
          );
        })
      );
  });