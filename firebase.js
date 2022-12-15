const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./firebase-key.json');

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://newagent-xuvwwy.firebaseio.com"
});

const db = getFirestore();

module.exports = db;