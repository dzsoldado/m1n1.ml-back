const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = require('./firebase-key.json');

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://newagent-xuvwwy.firebaseio.com"
});

const db = getFirestore();
const auth = getAuth();

module.exports = {
  db,
  auth,
};