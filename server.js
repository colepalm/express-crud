const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://polecalm:polecalm1@ds023530.mlab.com:23530/crud-people', (err, database) => {
  if (err) return console.log(err)
  db = database

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('people').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {people: result})
  })
})

app.post('/people', (req, res) => {
  db.collection('people').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('post complete')
    res.redirect('/')
  })
})
