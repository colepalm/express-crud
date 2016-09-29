const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds023530.mlab.com:23530/crud-people', (err, database) => {
  if (err) return console.log(err)
  db = database

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
})

app.post('/people', (request, response) => {
  db.collection('people').save(req.body, (err, result)) => {
    if (err) return console.log(err)

    console.log('post complete')
    res.redirect('/')
  }
})
