const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

//middleware

//routes

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})