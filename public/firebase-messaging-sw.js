// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyBUhjzUxO8OPPylra2BQb62dRSRavk_ovA",
  authDomain: "drzn-2025-c3816.firebaseapp.com",
  projectId: "drzn-2025-c3816",
  storageBucket: "drzn-2025-c3816.firebasestorage.app",
  messagingSenderId: "920754583159",
  appId: "1:920754583159:web:5abf8f1844f846e3edf872",
  measurementId: "G-9MSQFYDB88",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });
});
// =================================== new ==========================
