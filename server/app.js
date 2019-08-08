const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
const ROOT_DIR = path.dirname(process.mainModule.filename);

app.use(express.static(path.join(ROOT_DIR, 'public')));

app.get('/example', (req, res) => {
  res.json({ success: true, msg: 'User registered' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'public/index.html'));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Its Starts' + ' on port: ' + port);
});
const io = require('socket.io')(server);
io.on('start', socket => {
  console.log('Client connected');
});
io.emit('start', {
  msg: 'Server to client, do you read me? Over.',
});
