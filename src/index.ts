import express = require("express");
require('./config/deploymentConfig.js');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes); 
app.use(petRoutes);

const { conectionDB } = require('./config/mongoConfig.js'); 
conectionDB();

module.exports = app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);   
});



