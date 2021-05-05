import express = require("express");
require('./config/deploymentConfig.js');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cors = require('cors'); 
import userRoutes from "./routes/userRoutes";
import petRoutes from "./routes/petRoutes";
import login from './routes/auth';

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes); 
app.use(petRoutes.router);
app.use(login);

const { conectionDB } = require('./config/mongoConfig.js'); 
conectionDB();

module.exports = app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);   
});



