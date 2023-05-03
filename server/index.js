const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
// port number
const PORT = process.env.PORT || 5000;

// connect to db 
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/', require('./routes/activityRoutes'));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
