
// var socket = io.connect('http://localhost:5000');
var socket = io();

socket.on('connection', function () {
    console.log('I have made a persistent two-way connection to the server!');
    // socket.emit('wantToJoinRoom', window.location.pathname)
    // socket.emit('redraw')
});

// socket.on('bid', function(content) {
//      $('#bids').append(content["amount"] + "");
// });
//
// $('#submit').click(function(){
//     socket.emit('bid', { "amount" : $('#input').val() });
// });
