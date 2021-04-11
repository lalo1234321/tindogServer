const mongoose = require('mongoose');

const conectionDB = () => {
    mongoose.connect(process.env.URI_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        (err)?console.log("error in the conection"):console.log("conection successfully with mongodb");
    });
};





module.exports = {
    conectionDB
};

