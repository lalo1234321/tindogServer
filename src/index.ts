import express = require("express");
require('./config/deploymentConfig.js');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cors = require('cors'); 

// app.set('port', process.env.PORT || 8080);
// server.listen(app.get('port'));
//server.listen(8080, "192.168.100.6");

import userRoutes from "./routes/userRoutes";
import petRoutes from "./routes/petRoutes";
import login from './routes/auth';
import deleteUser from './routes/DeleteUser';
import sales from './routes/salesRoutes';
import terms from './routes/termsRoutes';
import topicChat from './routes/chatTopicRoutes';

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes); 
app.use(petRoutes);
app.use(topicChat);
app.use(login);
app.use(express.static('public'));
app.use(sales);
app.use(terms);

app.use(deleteUser);

const server  = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


const { conectionDB } = require('./config/mongoConfig.js'); 
conectionDB();

module.exports = server.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);   
});



