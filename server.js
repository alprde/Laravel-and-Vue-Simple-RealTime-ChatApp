require('dotenv').config()

const fs = require('fs');

let https, options;

if(fs.existsSync(process.env.SSL_PATH+'privkey.pem')){
    https = require('https');

    options = {
        key: fs.readFileSync(process.env.SSL_PATH+'privkey.pem'),
        cert: fs.readFileSync(process.env.SSL_PATH+'cert.pem'),
        ca: fs.readFileSync(process.env.SSL_PATH+'fullchain.pem')
    };
}else{
    https = require('http');

    options = {};
}


const app = https.createServer(options);

const io = require('socket.io')(app, {
    cors: {
        origin: '*',
    }
});

const redis = require('redis');
const client = redis.createClient();

const subscriber = client.duplicate();

subscriber.connect();

app.listen(process.env.MIX_SOCKET_PORT);
let users = [];
let messages = [];

io.on('connection', socket => {
    subscriber.subscribe('notification-channel', (message) => {
        console.log(message); // 'message'
        io.emit('messages', message);
    });

    socket.on('new_user', (name) => {
        users.push({
            id: socket.id,
            name
        });
        io.emit('users', users);
        io.emit('messages', messages);
    });
    socket.on('new_message', (message) => {
        messages.push("<b>" + message.name + ":</b> " + message.message);
        io.emit('messages', messages);
    });
    socket.on('disconnect', () => {
        const index = users.indexOf(socket.id);
        users.splice(index, 1);
        io.emit('users', users);
    });
});
