var WebSocket = require('ws')

var ws = new WebSocket('ws://localhost:6000', {
  perMessageDeflate: false
})

ws.on('message', (data) => {
  console.log(data)
})

ws.on('open', () => {
  ws.send('https://www.youtube.com/watch?v=QS8qwMna8_o')
})
