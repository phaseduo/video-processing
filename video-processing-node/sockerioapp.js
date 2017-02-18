require('dotenv').config()
var watson = require('./watson');
var youtube_dl = require('./youtube_dl');
var path = require('path');

/*var server = require('http').createServer();
var io = require('socket.io')('server')

io.on('connection', (client) => {
  console.log('Connected')
  client.on('url', (data) => {
     youtube_dl.getYouTubeAudio(data.url)
     .then(watson.watsonSpeechToText.bind(this, path.join(__dirname, 'file.flac'), client))
  })
})

server.listen(8080)*/

//https://www.youtube.com/watch?v=QS8qwMna8_o


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(client){
  console.log('a user connected');
  client.on('url', (data) => {
     youtube_dl.getYouTubeAudio(data.url)
     .then(watson.watsonSpeechToText.bind(this, path.join(__dirname, 'file.flac'), client))
  })
});

http.listen(3000, function(){
  console.log('listening on 3000');
});
