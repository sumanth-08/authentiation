const express = require("express");
const mongoose = require("mongoose");

const app = express()

const bodyParser = require("body-parser")

app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser")
const cors = require("cors");
const router = require("./routes/user");
require("dotenv").config()

const userRoutes = ("./routes/user")

app.use('/api', router)

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    // useCreateIndex: true
}).then(() => {
    console.log("Database connected")
}).catch(() => {
    console.log("Unable to connect")
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('server is connected')
})