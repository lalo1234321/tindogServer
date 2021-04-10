require('./config/deploymentConfig');
const express = require('express');
const app = express();

const { conectionDB } = require('./config/mongoConfig.js');




conectionDB();
app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(process.env.PORT, () => {
    console.log('Server online');   
});