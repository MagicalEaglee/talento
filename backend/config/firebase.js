const admin = require("firebase-admin")
const serviceAccount = require("./firebaseServiceAccountKey.json")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://<database>.firebaseio.com",
})

module.exports = admin
