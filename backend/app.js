const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
app.use(express.json());

require('./config/db');
require('dotenv').config({
    path: path.join(__dirname,'.env')
})
const Router = require('./routes/allRoutes');
app.use('/api', Router);


server.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`);
});
