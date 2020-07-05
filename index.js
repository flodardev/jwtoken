const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()

const app = express();
app.use(express.json())

// Mongoose to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database")
});

// Import routes
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

app.use("/api", authRoute)
app.use("/post", postRoute)

app.listen(5000, () => console.log("Server is running on port 5000."))