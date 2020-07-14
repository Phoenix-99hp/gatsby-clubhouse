require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")

const mongoDb = process.env.DB_URI || process.env.DEV_DB
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

require("./routes/apiRoutes.js")(app)

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))
