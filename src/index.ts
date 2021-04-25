import express = require("express");
require('./config/deploymentConfig.js');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// const user = require('./routes/testRoutes.js');
import user from './routes/user';
import login from './routes/auth';

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(user);
app.use(login);

const { conectionDB } = require('./config/mongoConfig.js'); 
conectionDB();
app.get('/', (req, res) => {
    res.send("Hello World");
})

module.exports = app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);   
});



