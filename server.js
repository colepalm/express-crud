const express = require('express');
const app = express();

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
})

app.post('/people', (request, response) => {
  console.log("Person has been added")
})
