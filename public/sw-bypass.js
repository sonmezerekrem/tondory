// Emergency service worker bypass
// This script can be used to unregister the service worker if it's causing issues

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister().then(function(boolean) {
        console.log('Service Worker unregistered:', boolean);
      });
    }
  });
  
  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for(let name of names) {
        caches.delete(name);
      }
    });
  }
  
  console.log('Service worker and caches cleared. Please refresh the page.');
}