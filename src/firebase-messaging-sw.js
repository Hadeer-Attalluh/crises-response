importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({ 
  apiKey: "AIzaSyDM09nMorzgVrmPIZIvd6TZkqitcDdz4Bw",
  authDomain: "crises-response-b46d0.firebaseapp.com",
  projectId: "crises-response-b46d0",
  storageBucket: "crises-response-b46d0.appspot.com",
  messagingSenderId: "984067287775",
  appId: "1:984067287775:web:e71f1ef4c8293cdcbc576a",
  measurementId: "G-XQLM5WZJWK"

});
const messaging = firebase.messaging();