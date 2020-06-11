const admin = require("firebase-admin");

var serviceAccount = require("../firebaseKeyService.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-challenge-b5308.firebaseio.com"
});

const db = admin.database();

module.exports =  db;
