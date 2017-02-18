require('dotenv').config()
var watson = require('./watson');  
var youtube_dl = require('./youtube_dl');  
var path = require('path');

var WebSocket = require('ws')

var wss = new WebSocket.Server({
  perMessageDeflate: false, 
  port: 6000
})
//https://www.youtube.com/watch?v=QS8qwMna8_o
wss.on('connection', (ws) => {
  ws.on('message', (msg)=> {
    youtube_dl.getYouTubeAudio(msg)
     .then(watson.watsonSpeechToText.bind(this, path.join(__dirname, 'file.flac'), ws))
     //.then()
  })
})

