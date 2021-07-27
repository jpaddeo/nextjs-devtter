const admin = require('firebase-admin');

try {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT),
    databaseURL: 'https://devtter-ddff1.firebaseio.com',
  });
} catch (e) {}

export const firestore = admin.firestore();
