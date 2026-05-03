self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || 'Hustle Apparel';
  const options = {
    body: data.body || 'New drop detected in the warehouse.',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: { url: self.location.origin }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
