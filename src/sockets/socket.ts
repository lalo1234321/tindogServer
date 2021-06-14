

const { io } = require('../index');


io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente descontectado');
    });
});