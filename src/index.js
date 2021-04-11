require('./config/deploymentConfig.js');
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const user = require('./routes/testRoutes.js');



app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(user);

const { conectionDB } = require('./config/mongoConfig.js');




conectionDB();
app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);   
});