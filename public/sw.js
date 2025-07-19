const CACHE_NAME = 'tondory-v2';
const STATIC_CACHE_NAME = 'tondory-static-v2';
const DYNAMIC_CACHE_NAME = 'tondory-dynamic-v2';

const STATIC_ASSETS = [
  '/',
  '/app',
  '/app/articles',
  '/app/bookmarks',
  '/auth/login',
  '/auth/register',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip requests to different origins
  if (url.origin !== location.origin) {
    return;
  }

  // Skip auth routes - let them handle redirects naturally
  if (url.pathname.startsWith('/auth/')) {
    return;
  }

  // Skip API requests - let them handle their own caching and errors
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip middleware-handled routes that might redirect
  if (url.pathname.startsWith('/app/') || url.pathname === '/app') {
    return;
  }

  // Only handle static assets and public pages
  if (
    url.pathname === '/' ||
    url.pathname.startsWith('/about') ||
    url.pathname.startsWith('/privacy') ||
    url.pathname.startsWith('/terms') ||
    url.pathname.startsWith('/release-notes') ||
    url.pathname.includes('.') // static files
  ) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(request)
            .then((response) => {
              // Don't cache redirects or errors
              if (!response || response.status >= 300 || response.type !== 'basic') {
                return response;
              }

              // Cache successful responses
              const responseToCache = response.clone();
              caches.open(DYNAMIC_CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // Return offline fallback for navigation requests
              if (request.mode === 'navigate') {
                return caches.match('/') || new Response('Offline', { status: 503 });
              }
              throw new Error('Network error');
            });
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle offline actions when connection is restored
      handleBackgroundSync()
    );
  }
});

async function handleBackgroundSync() {
  try {
    // Get pending actions from IndexedDB or localStorage
    // This would sync any pending article additions, bookmarks, etc.
    console.log('Processing background sync');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [200, 100, 200],
      data: data.data,
      actions: [
        {
          action: 'view',
          title: 'View',
          icon: '/icons/icon-72x72.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons/icon-72x72.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});