const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware

// set port
const port = process.env.port || 3000;

// app
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use ((req,res) => {
    res.status('404').send('Oops, you are lost baby');

})

app.listen(port, () => {
    console.log('We are online bitch!');
});
