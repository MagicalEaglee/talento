const express = require("express")
const mongoose = require("mongoose")
const firebaseAdmin = require("firebase-admin")
const app = express()

require("dotenv").config()

// Firebase config
const serviceAccount = require("./config/firebaseServiceAccountKey.json")
firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
})

// Middleware
app.use(express.json())

// Routes
const authRoutes = require("./routes/authRoutes")
app.use("/api/auth", authRoutes)

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err))

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app
