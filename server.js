// const http = require('http').createServer();

var https = require('https'),
    fs = require('fs');

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/mwijkaasmdelvjvf.tzty.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/mwijkaasmdelvjvf.tzty.net/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/mwijkaasmdelvjvf.tzty.net/chain.pem')
};


var app = https.createServer(options);

const io = require('socket.io')(app, {
    cors: {
        origin: '*',
    }
});

const redis = require('redis');
const client = redis.createClient();

const subscriber = client.duplicate();

subscriber.connect();

app.listen(3000);
let users = [];
let messages = [];

subscriber.subscribe('notification-channel', (message) => {
    console.log(message); // 'message'
});

// client.on('message', function(channel, data) {
//     console.log(`channel: ${channel} message: ${data}`);
//
//     io.emit(channel, data);
// });

io.on('connection', socket => {


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
