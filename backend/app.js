const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const busRoutes = require('./routes/buses');
const authRoutes = require('./routes/auths');
const mongoUrl = "mongodb://127.0.0.1:27017/bus-booking"
const mongoAtlasUrl = "mongodb+srv://jittotp:2VDVYvu1vJl4YIIb@cluster0-buaqk.mongodb.net/bus-booking-app?retryWrites=true&w=majority";

mongoose.connect(mongoAtlasUrl, {useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>console.log("DB Connected"))
.catch((err)=> console.log("Error in DB Connection"+err))


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    next();
})
app.use(express.static(path.join(__dirname, '../dist/bus-booking-app')));

app.use('/auth', authRoutes);
app.use('/bus', busRoutes);

module.exports = app;