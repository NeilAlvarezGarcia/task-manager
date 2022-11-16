// Configuring .env file
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const fs = require('fs');
const { join } = require('path');

// Importing routes and connection
const tasks = require('./routes/task');
const connectDB = require('./db/connect');

//Setting up the application
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.static('public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks)

// Not found route
app.use((_req, res) => {
    const filePath = join(__dirname + '/public/not-found.html');
    fs.readFile(filePath, (err, response) => {
        if (err) {
            console.log(err);
            return process.exit();
        }

        res.status(404).write(response);
        res.end()
    })
})


// Function that starts the application
const start = async () => {
    try {
        const URL = process.env.MONGO_URI
        await connectDB(URL);
        app.listen(port);
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

start();
 