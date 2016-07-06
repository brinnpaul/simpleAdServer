var path = require('path')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var bids = [{ amount: 2.37, id: '/#1yqi8gvkpAhSJz_qAAAB', username: 'Brinn', image: 'elephants' },
            { amount: 2.39, id: '/#1yqi8gvkpAhSJz_qAAAB', username: 'Brinn', image: 'tigers' }]


// when a client connects
io.on('connection', function (socket) {
      // listen to incoming bids
      socket.on('bid', function(content) {
           // echo to the sender
           console.log(content)
           content.id = socket.id
           console.log(isNaN(content.amount))
           if (isNaN(content.amount) === false) bids.push(content)
           socket.emit('bid', content["amount"]);
           socket.broadcast.emit('bid', content.username + ' bid: ' + content["amount"])
      })

      setInterval(function() {
        // determine max bid
        var max = Math.max.apply(null, bids.map(function(bid) { return parseFloat(bid.amount) }))
        var index = bids.map(function(bid) { return parseFloat(bid.amount) }).indexOf(max)
        var info = bids.slice(index, index+1)[0]
        console.log(info)
        // send bid winner info back to clients
        socket.broadcast.emit('impression', info)
      }, 3000)
 })

http.listen(5000, function () {
   console.log('The server is listening on port 5000!');
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})
