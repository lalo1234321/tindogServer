
const { io } = require('../index');
const jwt1 = require('../utils/jwt');
const socketController = require('../controllers/socket');

io.on('connection', client => {
    console.log('Cliente conectado');
    const [valido, uid] = jwt1.comprobarJWT( client.handshake.headers['token'] );
    const petUserName = client.handshake.headers['petusername'];
    console.log(valido, uid);
    if( !valido ) { return client.disconnect(); }
    console.log('Cliente autenticado');
    socketController.userOnline(uid);
    console.log(petUserName);
    client.join( petUserName );
    client.on('notify', async(payload) => {
        console.log(payload);
        await socketController.registerNotification(payload.from, payload.to);
        io.to(payload.to).emit('notify',payload);
    });
    client.on('personal-message', async(payload) => {
        console.log(payload);
        await socketController.registerMessage( payload.from, payload.to, payload.msg );
        io.to(payload.to).emit('personal-message',payload);
    });
    client.on('disconnect', () => {
        console.log('Cliente descontectado');
        socketController.userOffline(uid);
    });
});